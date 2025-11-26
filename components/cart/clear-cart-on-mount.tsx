"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/context/cart-context";

export function ClearCartOnMount() {
    const { clearCart } = useCart();
    const hasCleared = useRef(false);

    useEffect(() => {
        if (!hasCleared.current) {
            clearCart();
            hasCleared.current = true;
        }
    }, [clearCart]);

    return null;
}
