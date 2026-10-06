import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  size: string;
  message?: string;
};

type Toast = { id: number; text: string };
type Profile = { name: string; email: string; phone: string };

type Store = {
  cart: CartItem[];
  wishlist: string[];
  recent: string[];
  toasts: Toast[];
  cartOpen: boolean;
  searchOpen: boolean;
  profile: Profile | null;
  orders: { id: string; total: number; date: string; status: string }[];
  addToCart: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeFromCart: (slug: string, size: string) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  toggleWish: (slug: string) => void;
  view: (slug: string) => void;
  pushToast: (text: string) => void;
  dismiss: (id: number) => void;
  setCartOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  clearCart: () => void;
  signInLocal: (profile: Profile) => void;
  signOutLocal: () => void;
  placeOrder: (total: number) => string;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      recent: [],
      toasts: [],
      cartOpen: false,
      searchOpen: false,
      profile: null,
      orders: [],
      addToCart: (item) => {
        const cart = get().cart.map((c) => ({ ...c }));
        const found = cart.find((c) => c.slug === item.slug && c.size === item.size && c.message === item.message);
        if (found) found.qty += item.qty ?? 1;
        else cart.push({ ...item, qty: item.qty ?? 1 });
        set({ cart, cartOpen: true });
        get().pushToast(`${item.name} added to your cart.`);
      },
      removeFromCart: (slug, size) => set({ cart: get().cart.filter((c) => !(c.slug === slug && c.size === size)) }),
      setQty: (slug, size, qty) =>
        set({ cart: get().cart.map((c) => (c.slug === slug && c.size === size ? { ...c, qty: Math.max(1, qty) } : c)) }),
      toggleWish: (slug) => {
        const has = get().wishlist.includes(slug);
        set({ wishlist: has ? get().wishlist.filter((s) => s !== slug) : [...get().wishlist, slug] });
        get().pushToast(has ? "Removed from wishlist." : "Added to wishlist.");
      },
      view: (slug) => set({ recent: [slug, ...get().recent.filter((s) => s !== slug)].slice(0, 8) }),
      pushToast: (text) => {
        const id = Date.now() + Math.random();
        set({ toasts: [...get().toasts, { id, text }] });
        setTimeout(() => get().dismiss(id), 2800);
      },
      dismiss: (id) => set({ toasts: get().toasts.filter((t) => t.id !== id) }),
      setCartOpen: (v) => set({ cartOpen: v }),
      setSearchOpen: (v) => set({ searchOpen: v }),
      clearCart: () => set({ cart: [] }),
      signInLocal: (profile) => set({ profile }),
      signOutLocal: () => set({ profile: null }),
      placeOrder: (total) => {
        const id = "PET" + Math.floor(100000 + Math.random() * 899999);
        set({
          orders: [{ id, total, date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }), status: "Preparing flowers" }, ...get().orders],
          cart: [],
        });
        if (typeof sessionStorage !== "undefined") sessionStorage.setItem("petale-order", JSON.stringify({ id, total }));
        return id;
      },
    }),
    {
      name: "petale-store",
      partialize: (s) => ({ cart: s.cart, wishlist: s.wishlist, recent: s.recent, profile: s.profile, orders: s.orders }),
    },
  ),
);
