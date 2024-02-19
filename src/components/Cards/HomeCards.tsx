import React, { useState } from "react";
import { Card } from "@mui/material";
import { Book } from "../../utils/interfaces";
import styles from "./HomeCards.module.scss";
import { LoadingButton } from "@mui/lab";
import { addCartBook } from "../../slices/cartSlice";
import { useAppDispatch } from "../../hooks/hooks";

export default function HomeCards({ book }: { book: Book }) {
  const [isloadingButton, setIsLoadingButton] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddCart = (book: Book) => {
    dispatch(addCartBook(book));
  };

  const handleClick = (book: Book) => {
    setIsLoadingButton(true);
    setTimeout(() => setIsLoadingButton(false), 500);
    handleAddCart(book);
  };

  const secureThumbnailUrl = (url: string) => {
    return url.replace(/^http:\/\//i, "https://");
  };

  return (
    <div className={styles.scrollContainer}>
      <div className={styles.containerCards}>
        <Card key={book.id} className={styles.bookCard} variant="outlined">
          <img
            height="196"
            width="128"
            src={secureThumbnailUrl(
              book.volumeInfo.imageLinks?.thumbnail ||
                "https://via.placeholder.com/128x196?text=No+Thumbnail"
            )}
            alt={book.volumeInfo.title}
          />
          <h2 tabIndex={0}>{book.volumeInfo.title}</h2>
          {book.saleInfo && book.saleInfo.listPrice ? (
            <>
              <p>Preço: {book.saleInfo.listPrice.amount}$</p>
              <LoadingButton
                variant="contained"
                size="medium"
                className={styles.buttonBuy}
                loading={isloadingButton}
                loadingPosition="center"
                onClick={() => handleClick(book)}
              >
                Comprar
              </LoadingButton>
            </>
          ) : (
            <LoadingButton
              className={styles.buttonBuy}
              loading={isloadingButton}
              loadingPosition="center"
            >
              Indisponível
            </LoadingButton>
          )}
        </Card>
      </div>
    </div>
  );
}
