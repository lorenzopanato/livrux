import { useGetBookByIdQuery } from "../../Services/googleBooksApi";
import style from "./BookDetails.module.scss";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

export default function BookDetailsSkeleton() {
  return (
    <>
      <main className={style.main}>
        <section className={style.buySection}>
          <Skeleton variant="rectangular" width={300} height={400} />
          <div className={style.bookDetails}>
            <p>
              <Skeleton variant="text" width={400} />
            </p>
            <h1>
              <Skeleton variant="rectangular" width={300} height={40} />
            </h1>
            <div className={style.bookInfo}>
              <Skeleton variant="rectangular" width={596} height={45} />
            </div>
            <div className={style.price}>
              <Skeleton variant="rectangular" width={130} height={39} />
            </div>
            <div className={style.buttons}>
              <Skeleton variant="rectangular" width={596} height={43} />
              <Skeleton variant="rectangular" width={596} height={43} />
            </div>
          </div>
        </section>
        <section className={style.detailsSection} id="details">
          <div className={style.descriptionContainer}>
            <Skeleton variant="rectangular" width={458} height={295} />
          </div>
          <div className={style.detailsContainer}>
            <Skeleton variant="rectangular" width={458} height={295} />
          </div>
        </section>
      </main>
    </>
  );
}
