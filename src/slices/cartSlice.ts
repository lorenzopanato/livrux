import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Book } from "../utils/interfaces";
import { enqueueSnackbar } from "notistack";

interface CartState {
  cart: Book[];
  cartPrice: number;
}

const initialState: CartState = {
  cart: [],
  cartPrice: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartBook: (state, action: PayloadAction<Book>) => {
      const newBook: Book = { ...action.payload };
      newBook.quantity = 1;

      const existingBookIndex = state.cart.findIndex(
        (book) => book.id === newBook.id
      );

      if (existingBookIndex !== -1) {
        state.cart[existingBookIndex].quantity += 1;
        enqueueSnackbar(
          action.payload.volumeInfo.title +
            "adicionado ao carrinho!" +
            "\nQuantidade: " +
            state.cart[existingBookIndex].quantity,
          {
            variant: "success",
          }
        );
      } else {
        state.cart.push(newBook);
        enqueueSnackbar(
          action.payload.volumeInfo.title + " adicionado ao carrinho!",
          {
            variant: "success",
          }
        );
      }
    },
    removeCartBook: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const index = state.cart.findIndex((book) => book.id === id);

      if (index !== -1) {
        state.cart[index].quantity = quantity;
        if (quantity === 0) {
          enqueueSnackbar(
            state.cart[index].volumeInfo.title + " removido do carrinho",
            {
              variant: "info",
            }
          );
          state.cart = state.cart.filter((book) => book.id !== id);
        } else {
          enqueueSnackbar(
            "Nova quantidade para o livro " +
              state.cart[index].volumeInfo.title +
              "! Quantidade: " +
              state.cart[index].quantity,
            {
              variant: "success",
            }
          );
        }
      }
    },

    totalCartPrice: (state) => {
      const totalPrice = state.cart.reduce((total, Book) => {
        const totalPriceForBook =
          parseFloat(Book.saleInfo.listPrice.amount) * Book.quantity;
        return total + totalPriceForBook;
      }, 0);

      state.cartPrice = Number(totalPrice.toFixed(2));
    },
  },
});

export const { addCartBook, removeCartBook, totalCartPrice } =
  cartSlice.actions;

export default cartSlice.reducer;
