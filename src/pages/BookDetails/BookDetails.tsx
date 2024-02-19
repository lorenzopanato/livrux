import { useGetBookByIdQuery } from "../../Services/googleBooksApi";
import style from "./BookDetails.module.scss";
import { useParams } from "react-router-dom";
import BookDetailsSkeleton from "./BookDetailsSkeleton";
import { Book } from "../../utils/interfaces";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { addCartBook } from "../../slices/cartSlice";
import { useAppDispatch } from "../../hooks/hooks";

export default function BookDetails() {
  const [isloadingButton, setIsLoadingButton] = useState(false);
  const { id } = useParams();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id);
  const dispatch = useAppDispatch();

  const handleAddCart = (book: Book) => {
    dispatch(addCartBook(book));
  };

  const handleClick = (book: Book) => {
    setIsLoadingButton(true);
    setTimeout(() => setIsLoadingButton(false), 500);
    handleAddCart(book);
  };

  if (isLoading) {
    return <BookDetailsSkeleton></BookDetailsSkeleton>;
  }

  if (isError) {
    return <main className={style.main}>Erro</main>;
  }

  return (
    <>
      <main className={style.main}>
        {book !== undefined ? (
          <section className={style.buySection}>
            <img
              src={
                book.volumeInfo.imageLinks?.thumbnail ||
                "https://via.placeholder.com/140x210?text=No+Thumbnail"
              }
              alt={"capa do livro " + book.volumeInfo.title}
            />
            <div className={style.bookDetails}>
              <p>
                Categoria:
                <strong> {book.volumeInfo.categories[0]}</strong>
              </p>
              <h1>{book.volumeInfo.title}</h1>
              <div className={style.bookInfo}>
                <div className={style.leftSection}>
                  <p>
                    <strong>Autor: </strong>
                    {book.volumeInfo.authors}
                  </p>
                  <p>
                    <strong>Editora: </strong>
                    {book.volumeInfo.publisher}
                  </p>
                </div>
                <a href="#details">Mais informações</a>
              </div>
              <div className={style.price}>
                <p>Compre agora por:</p>
                <h2>{book.saleInfo.listPrice.amount} $</h2>
              </div>
              <div className={style.buttons}>
                <button className={style.buyButton}>COMPRAR</button>
                <LoadingButton
                  className={style.cartButton}
                  loading={isloadingButton}
                  loadingPosition="center"
                  onClick={() => handleClick(book)}
                >
                  Adicionar ao carrinho
                </LoadingButton>
              </div>
            </div>
          </section>
        ) : null}
        {book !== undefined ? (
          <section className={style.detailsSection} id="details">
            <div className={style.descriptionContainer}>
              <h3>Sinopse</h3>
              <p>{book.volumeInfo.description}</p>
            </div>
            <div className={style.detailsContainer}>
              <h3>Detalhes</h3>
              <div className={style.details}>
                <p>
                  <strong>Autor: </strong>
                  {book.volumeInfo.authors}
                </p>
                <p>
                  <strong>Editora: </strong>
                  {book.volumeInfo.publisher}
                </p>
                <p>
                  <strong>Categorias: </strong>
                  {book.volumeInfo.categories}
                </p>
                <p>
                  <strong>Número de páginas: </strong>
                  {book.volumeInfo.pageCount}
                </p>
                <p>
                  <strong>Ano de publicação: </strong>
                  {book.volumeInfo.publishedDate.split("-")[0]}
                </p>
                <p>
                  <strong>Mais informações: </strong>
                  <a href={book.volumeInfo.infoLink} target="_blank">
                    {book.volumeInfo.infoLink}
                  </a>
                </p>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
