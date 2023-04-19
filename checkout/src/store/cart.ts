import globalStorage, { ICartData, IItemCart } from "@/utils/loadStorage";
import _ from "lodash";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cartData = ref<ICartData | null>();

  const totalItems = computed(() => {
    return cartData.value?.totalItems || 0;
  });

  const grandTotal = computed(() => {
    return cartData.value?.grandTotal || 0;
  });

  const load = () => {
    cartData.value = globalStorage.getCartData();
  };

  const removeCartData = () => {
    globalStorage.removeCartData();
    cartData.value = null;
  };

  const removeItem = (item: any) => {
    if (!cartData.value) return;
    if (cartData.value.items.length > 0) {
      const findIndex = _.findIndex(
        cartData.value.items,
        (o: IItemCart) => o.id === item.id
      );
      if (findIndex !== -1) {
        const newData = _.filter(cartData.value.items, (o) => o.id !== item.id);
        if (newData.length > 0) {
          cartData.value.items = newData;
          cartData.value.totalItems -= 1;
          cartData.value.subTotal -= item.price * item.qty;
          cartData.value.grandTotal = cartData.value.subTotal;
        } else {
          removeCartData();
        }
      }
      globalStorage.removeItemFromCart(item);
    }
  };
  const recalculateTotal = () => {
    if (!cartData.value) return;

    const total = cartData.value.items.reduce((acc, item) => {
      return acc + item.price * item.qty;
    }, 0);
    cartData.value.subTotal = total;
    cartData.value.grandTotal = total;
  };

  const onChangeQty = (item: IItemCart) => {
    if (!cartData.value) return;

    const index = cartData.value.items.findIndex((x) => x.id === item.id);
    if (index > -1) {
      cartData.value.items[index].qty = item.qty;
    }
    recalculateTotal();
    onUpdateLocalStorage();
  };

  const onUpdateLocalStorage = () => {
    if (!cartData.value) return;
    globalStorage.setCartData(cartData.value);
  };

  const saveOrder = ({
    paymentMethod,
    paymentStatus,
  }: {
    paymentMethod: string;
    paymentStatus: string;
  }) => {
    globalStorage.saveOrder({
      grandTotal: cartData.value?.grandTotal || 0,
      subTotal: cartData.value?.subTotal || 0,
      totalItems: cartData.value?.totalItems || 0,
      userId: cartData.value?.userId || null,
      paymentMethod,
      paymentStatus,
    });
  };

  return {
    cartData,
    totalItems,
    load,
    removeCartData,
    saveOrder,
    removeItem,
    recalculateTotal,
    onChangeQty,
    onUpdateLocalStorage,
    grandTotal,
  };
});
