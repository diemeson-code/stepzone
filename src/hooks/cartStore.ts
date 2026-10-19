
import type { Product } from "@/data/products";

export type CartItem = Product & {
  quantity: number;
};

const STORAGE_KEY = "stepzone-cart";

let items: CartItem[] = [];
let initialized = false;

const listeners = new Set<() => void>();
const serverSnapshot: CartItem[] = [];

function notify() {
  listeners.forEach((listener) => listener());
}

function initialize() {
  if (initialized || typeof window === "undefined") return;

  initialized = true;

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const parsed: unknown = JSON.parse(saved);

    if (Array.isArray(parsed)) {
      items = parsed as CartItem[];
    }
  } catch {
    items = [];
  }
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot() {
  initialize();
  return items;
}

export function getServerSnapshot() {
  return serverSnapshot;
}

export function saveItems(nextItems: CartItem[]) {
  initialize();
  items = nextItems;

  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  notify();
}
