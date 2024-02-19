import {
  useFindAllBooksFavoriteQuery,
  useFindAllBooksGeekQuery,
  useFindAllBooksSeriesQuery,
} from "../../Services/googleBooksApi";
import { Book } from "../../utils/interfaces";
import styles from "./Home.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import HomeSkeleton from "./HomeSkeleton";
import HomeCards from "../../components/Cards/HomeCards";

export default function Home() {
  const searched = useSelector((state: RootState) => state.books.searched);

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
    return <HomeSkeleton></HomeSkeleton>;
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
          <h2 style={{ marginBottom: "15px" }}>Sua busca</h2>
          <div className={styles.scrollContainer}>
            <div className={styles.containerCards}>
              {concatAllBooks()
                .filter((book: Book) =>
                  book.volumeInfo.title
                    .toLowerCase()
                    .includes(searched.toLowerCase())
                )
                .map((book: Book) => (
                  <HomeCards book={book} key={book.id} />
                ))}
              {concatAllBooks().filter((book: Book) =>
                book.volumeInfo.title
                  .toLowerCase()
                  .includes(searched.toLowerCase())
              ).length === 0 && <p style={{ fontSize: '1.1rem' }}>Nenhum resultado encontrado para "{searched}". Por favor, verifique a ortografia e tente novamente.</p>}
            </div>
          </div>
        </section>
      )}

      <h2>Mais Vendidos!</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.containerCards}>
          {dataFavorite.items.map((book: Book) => (
            <HomeCards book={book} key={book.id} />
          ))}
        </div>
      </div>
      <h2>HQS!</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.containerCards}>
          {dataGeek.items.map((book: Book) => (
            <HomeCards book={book} key={book.id} />
          ))}
        </div>
      </div>
      <h2>Harry Potter!</h2>
      <div className={styles.scrollContainer}>
        <div className={styles.containerCards}>
          {dataSeries.items.map((book: Book) => (
            <HomeCards book={book} key={book.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
