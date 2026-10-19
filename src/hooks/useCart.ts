
"use client";

import { useSyncExternalStore } from "react";
import type { Product } from "@/data/products";
import {
  getSnapshot,
  getServerSnapshot,
  saveItems,
  subscribe,
} from "@/hooks/cartStore";

export type { CartItem } from "@/hooks/cartStore";

export function useCart() {
  const items = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  function adicionarItem(produto: Product) {
    const atuais = getSnapshot();
    const existente = atuais.find((item) => item.id === produto.id);

    if (existente) {
      saveItems(
        atuais.map((item) =>
          item.id === produto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      saveItems([...atuais, { ...produto, quantity: 1 }]);
    }
  }

  function removerItem(id: string) {
    saveItems(getSnapshot().filter((item) => item.id !== id));
  }

  function atualizarQuantidade(id: string, quantidade: number) {
    if (quantidade <= 0) {
      removerItem(id);
      return;
    }

    saveItems(
      getSnapshot().map((item) =>
        item.id === id ? { ...item, quantity: quantidade } : item
      )
    );
  }

  const quantidadeTotal = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return {
    items,
    carregado: true,
    adicionarItem,
    removerItem,
    atualizarQuantidade,
    quantidadeTotal,
    subtotal,
  };
}

