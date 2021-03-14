import { useCallback, useEffect, useState } from 'react';

const ISSERVER = typeof window === 'undefined';

interface ICart {
  items: ICartItem[];
  paymentMethod: string;
  totals: number;
  machineId: number;
}

interface ICartItem {
  productId: number;
  qty: number;
  name: string;
  image: string;
  price: number;
  maxSaleQty: number;
}

interface ICartViewModel {
  data: ICart;
  mutations: {
    addToCart: (cart: ICartItem) => void;
    updateCartItem: (producytId: number, adjustNumber: number) => void;
    removeCartItem: (producytId: number) => void;
    resetCart: () => void;
  };
  isLoading: false;
  isError: false;
}

export function useCart(machineId: number): ICartViewModel {
  const [cartState, setCartState] = useState<ICart>();

  useEffect(() => {
    if (machineId) {
      const cart = fetchCart(machineId);
      setCartToStorage(machineId, cart);
      setCartState(cart);
    }
  }, [machineId]);

  const addToCartCallback = useCallback(addToCart(cartState, setCartState), [cartState, machineId]);
  const updateCartCallback = useCallback(updateCartItem(cartState, setCartState), [cartState, machineId]);
  const removeCartCallback = useCallback(removeCartItem(cartState, setCartState), [cartState, machineId]);
  const resetCartCallback = useCallback(resetCart(cartState, setCartState), [cartState, machineId]);

  return {
    data: cartState,
    mutations: {
      addToCart: addToCartCallback,
      updateCartItem: updateCartCallback,
      removeCartItem: removeCartCallback,
      resetCart: resetCartCallback,
    },
    isLoading: false,
    isError: false,
  };
}

function getCartFromStorage(machineId: number): ICart {
  try {
    if (ISSERVER) return null;

    const cart = localStorage.getItem(`cart:${machineId}`);
    const cartJson = JSON.parse(cart) as ICart;
    return cartJson;
  } catch (error) {
    localStorage.clear();
  }
}

function setCartToStorage(machineId, cart): void {
  if (ISSERVER) return null;

  const cartString = JSON.stringify(cart);
  localStorage.setItem(`cart:${machineId}`, cartString);
}

function fetchCart(machineId): ICart {
  let initialCart;
  const storedCart = getCartFromStorage(machineId);

  if (!storedCart) {
    initialCart = {
      items: [],
      paymentMethod: 'cash',
      machineId: machineId,
    };
  } else {
    initialCart = storedCart;
  }

  return initialCart;
}

function addToCart(cart, setCart) {
  return (cartItem: ICartItem) => {
    let newCartItems = [...cart.items];
    const existingItem = newCartItems.find((item) => item.productId === cartItem.productId);

    if (existingItem) {
      const newQty = existingItem.qty + cartItem.qty;
      const toBeQty = newQty > existingItem.maxSaleQty ? existingItem.maxSaleQty : newQty;
      existingItem.qty = toBeQty;
    } else {
      newCartItems = [...newCartItems, cartItem];
    }

    const newCart = {
      ...cart,
      totals: calculateCartTotals(newCartItems),
      items: newCartItems,
    };

    setCart(newCart);
    setCartToStorage(cart.machineId, newCart);
  };
}

function removeCartItem(cart, setCart) {
  return (productId: number) => {
    const newCartItems = [...cart.items];
    const itemNotToDelete = newCartItems.filter((item) => item.productId !== productId);

    const newCart = {
      ...cart,
      totals: calculateCartTotals(itemNotToDelete),
      items: itemNotToDelete,
    };

    setCart(newCart);
    setCartToStorage(cart.machineId, newCart);
  };
}

function resetCart(cart, setCart) {
  return () => {
    const newCart = {
      ...cart,
      totals: 0,
      items: [],
    };

    setCart(newCart);
    setCartToStorage(cart.machineId, newCart);
  };
}

function updateCartItem(cart, setCart) {
  return (productId: number, adjustNumber: number) => {
    const newCartItems = [...cart.items];
    const existingItem = newCartItems.find((item) => item.productId === productId);

    if (existingItem) {
      const newQty = existingItem.qty + adjustNumber;

      if (newQty > 0 && newQty <= existingItem.maxSaleQty) {
        existingItem.qty += adjustNumber;
      }
    }

    const newCart = {
      ...cart,
      totals: calculateCartTotals(newCartItems),
      items: newCartItems,
    };

    setCart(newCart);
    setCartToStorage(cart.machineId, newCart);
  };
}

function calculateCartTotals(items: ICartItem[]): number {
  const totals = items.reduce((result, current) => {
    result += current.price * current.qty;
    return result;
  }, 0);
  return totals;
}
