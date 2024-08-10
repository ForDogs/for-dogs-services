// import { atom } from "recoil";
// import { CartItem } from "@/interface/cart";

// // localStorage에서 장바구니 데이터를 로드하는 함수
// const loadCartFromLocalStorage = (): CartItem[] => {
//   const storedCart = localStorage.getItem("cart");
//   if (storedCart) {
//     try {
//       // localStorage에서 가져온 JSON 문자열을 파싱하여 반환
//       return JSON.parse(storedCart) as CartItem[];
//     } catch (error) {
//       console.error("Failed to parse cart from localStorage", error);
//       // 파싱에 실패한 경우, 빈 배열 반환
//       return [];
//     }
//   }
//   // localStorage에 장바구니 데이터가 없는 경우, 빈 배열 반환
//   return [];
// };

// export const cartState = atom<CartItem[]>({
//   key: "cartState", // 고유한 key 값
//   default: loadCartFromLocalStorage(), // 기본값을 localStorage에서 로드한 데이터로 설정
// });

import { atom } from "recoil";
import { CartItem as CartItemType } from "@/interface/cart";

// localStorage에서 장바구니 데이터를 로드하는 함수
const loadCartFromLocalStorage = (): CartItemType[] => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    try {
      return JSON.parse(storedCart) as CartItemType[];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  }
  return [];
};

// localStorage에 장바구니 데이터를 저장하는 함수
const saveCartToLocalStorage = (cart: CartItemType[]) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart to localStorage", error);
  }
};

// cartState 정의
export const cartState = atom<CartItemType[]>({
  key: "cartState",
  default: loadCartFromLocalStorage(),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((newCart) => {
        saveCartToLocalStorage(newCart);
      });
    },
  ],
});
