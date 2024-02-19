import {
  useFindAllBooksFavoriteQuery,
  useFindAllBooksGeekQuery,
  useFindAllBooksSeriesQuery,
} from "../../Services/googleBooksApi";
import { useAppDispatch } from "../../hooks/hooks";
import { Book } from "../../utils/interfaces";
import styles from "./Home.module.scss";
import { Card } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { addCartBook } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const searched = useSelector((state: RootState) => state.books.searched);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

  const handleAddCart = (book: Book) => {
    dispatch(addCartBook(book));
  };

  if (isLoadingFavorite || isLoadingGeek || isLoadingSeries) {
    return <main className={styles.main}>Loading...</main>;
  }

  if (isErrorFavorite || isErrorGeek || isErrorSeries) {
    return <main className={styles.main}>Error</main>;
  }

  const concatAllBooks = () =>
    dataFavorite.items.concat(dataGeek.items, dataSeries.items);

  return (
    <main className={styles.main}>
      {searched.length !== 0 && (
        <section>
          <h2>Sua busca</h2>
          <div className={styles.searchedCards}>
            {concatAllBooks()
              .filter((book: Book) =>
                book.volumeInfo.title
                  .toLowerCase()
                  .includes(searched.toLowerCase())
              )
              .map((book: Book) => (
                <Card
                  key={book.id}
                  className={styles.bookCard}
                  variant="outlined"
                >
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
                  <button className={styles.buttonBuy} onClick={() => console.log(book)}>Comprar</button>
                </Card>
              ))}
          </div>
        </section>
      )}

      <h2>Mais Vendidos!</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.containerCards}>
          {dataFavorite.items.map((book: Book) => (
            <Card key={book.id} className={styles.bookCard} variant="outlined">
              <img
                height="196"
                width="128"
                onClick={() => navigate(`/book-details/${book.id}`)}
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/140x210?text=No+Thumbnail"
                }
                alt={book.volumeInfo.title}
              />
              <h2>{book.volumeInfo.title}</h2>
              {book.saleInfo && book.saleInfo.listPrice ? (
                <>
                  <p>Preço: {book.saleInfo.listPrice.amount}$</p>
                  <button
                    className={styles.buttonBuy}
                    onClick={() => handleAddCart(book)}
                  >
                    Comprar
                  </button>
                </>
              ) : (
                <button
                  className={styles.buttonBuy}
                  onClick={() => handleAddCart(book)}
                  disabled
                >
                  Indisponível
                </button>
              )}
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
                onClick={() => navigate(`/book-details/${book.id}`)}
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/140x210?text=No+Thumbnail"
                }
                alt={book.volumeInfo.title}
              />
              <h2>{book.volumeInfo.title}</h2>
              {book.saleInfo && book.saleInfo.listPrice ? (
                <>
                  <p>Preço: {book.saleInfo.listPrice.amount}$</p>
                  <button
                    className={styles.buttonBuy}
                    onClick={() => handleAddCart(book)}
                  >
                    Comprar
                  </button>
                </>
              ) : (
                <button
                  className={styles.buttonBuy}
                  onClick={() => handleAddCart(book)}
                  disabled
                >
                  Indisponível
                </button>
              )}
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
                onClick={() => navigate(`/book-details/${book.id}`)}
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/140x210?text=No+Thumbnail"
                }
                alt={book.volumeInfo.title}
              />
              <h2>{book.volumeInfo.title}</h2>
              {book.saleInfo && book.saleInfo.listPrice ? (
                <>
                  <p>Preço: {book.saleInfo.listPrice.amount}$</p>
                  <button
                    className={styles.buttonBuy}
                    onClick={() => handleAddCart(book)}
                  >
                    Comprar
                  </button>
                </>
              ) : (
                <button
                  className={styles.buttonBuy}
                  onClick={() => handleAddCart(book)}
                  disabled
                >
                  Indisponível
                </button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
