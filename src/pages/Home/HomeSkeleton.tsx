import styles from "./Home.module.scss";
import stylesCard from "../../components/Cards/HomeCards.module.scss";
import { Card, Skeleton } from "@mui/material";

export default function Home() {
  return (
    <main className={styles.main}>
      <h2>Mais Vendidos!</h2>
      <div className={styles.scrollContainer}>
        <div className={stylesCard.containerCards}>
          {[...Array(10)].map((_, index) => (
            <Card
              key={index}
              className={stylesCard.bookCard}
              variant="outlined"
            >
              <Skeleton variant="rectangular" width={128} height={196} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
            </Card>
          ))}
        </div>
      </div>
      <h2>HQS!</h2>
      <div className={styles.scrollContainer}>
        <div className={stylesCard.containerCards}>
          {[...Array(10)].map((_, index) => (
            <Card
              key={index}
              className={stylesCard.bookCard}
              variant="outlined"
            >
              <Skeleton variant="rectangular" width={128} height={196} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
            </Card>
          ))}
        </div>
      </div>
      <h2>Harry Potter!</h2>
      <div className={styles.scrollContainer}>
        <div className={stylesCard.containerCards}>
          {[...Array(10)].map((_, index) => (
            <Card
              key={index}
              className={stylesCard.bookCard}
              variant="outlined"
            >
              <Skeleton variant="rectangular" width={128} height={196} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={100} />
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
