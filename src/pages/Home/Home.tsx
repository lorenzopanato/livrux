import { useNavigate } from "react-router-dom";
import {
  useFindAllBooksFavoriteQuery,
  useFindAllBooksGeekQuery,
  useFindAllBooksSeriesQuery,
} from "../../Services/googleBooksApi";
import { useAppDispatch } from "../../hooks/hooks";
import { Book } from "../../utils/interfaces";
import styles from "./Home.module.scss";
import { Card } from "@mui/material";

export default function Home() {
  const {
    data: dataFavorite,
    isLoading: isLoadingFavorite,
    isError: isErrorFavorite,
    error: errorFavorite,
  } = useFindAllBooksFavoriteQuery({});

  const {
    data: dataGeek,
    isLoading: isLoadingGeek,
    isError: isErrorGeek,
    error: errorGeek,
  } = useFindAllBooksGeekQuery({});

  const {
    data: dataSeries,
    isLoading: isLoadingSeries,
    isError: isErrorSeries,
    error: errorSeries,
  } = useFindAllBooksSeriesQuery({});

  if (isLoadingFavorite || isLoadingGeek || isLoadingSeries) {
    return <main className={styles.main}>Loading...</main>;
  }

  if (isErrorFavorite || isErrorGeek || isErrorSeries) {
    return <main className={styles.main}>Error</main>;
  }

  return (
    <main className={styles.main}>
      <h2>Mais Vendidos!</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.containerCards}>
          {dataFavorite.items.map((book: Book) => (
            <Card key={book.id} className={styles.bookCard} variant="outlined">
              <img
                height="196"
                width="128"
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/140x210?text=No+Thumbnail"
                }
                alt={book.volumeInfo.title}
              />
              <h2>{book.volumeInfo.title}</h2>
              {book.saleInfo && book.saleInfo.listPrice && (
                <p>Preço: {book.saleInfo.listPrice.amount}$</p>
              )}
              <button className={styles.buttonBuy}>Comprar</button>
            </Card>
          ))}
        </div>
      </div>
      <h2>HQS!</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.containerCards}>
          {dataGeek.items.map((book: Book) => (
            <Card key={book.id} className={styles.bookCard} variant="outlined">
              <img
                height="196"
                width="128"
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/140x210?text=No+Thumbnail"
                }
                alt={book.volumeInfo.title}
              />
              <h2>{book.volumeInfo.title}</h2>
              {book.saleInfo && book.saleInfo.listPrice && (
                <p>Preço: {book.saleInfo.listPrice.amount}$</p>
              )}
              <button className={styles.buttonBuy}>Comprar</button>
            </Card>
          ))}
        </div>
      </div>
      <h2>Harry Potter!</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.containerCards}>
          {dataSeries.items.map((book: Book) => (
            <Card key={book.id} className={styles.bookCard} variant="outlined">
              <img
                height="196"
                width="128"
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/140x210?text=No+Thumbnail"
                }
                alt={book.volumeInfo.title}
              />
              <h2>{book.volumeInfo.title}</h2>
              {book.saleInfo && book.saleInfo.listPrice && (
                <p>Preço: {book.saleInfo.listPrice.amount}$</p>
              )}
              <button className={styles.buttonBuy}>Comprar</button>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
