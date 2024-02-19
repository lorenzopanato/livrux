import { Bug } from "@phosphor-icons/react";
import styles from "./PageNotFound.module.scss";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";

export default function Cart() {
  const token = useAppSelector((state) => state.token.token);
  return (
    <main className={styles.main}>
      <h1 className={styles.nameError}>404</h1>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Page Not Found!</h2>
        <Bug size={32} className={styles.bug} />
      </div>
      {token ? (
        <>
          <p className={styles.text}>
            Lamentamos, mas não conseguimos encontrar a página que você está
            procurando. Por favor, retorne à página inicial e tente novamente.
          </p>
          <Link to={"/"} className={styles.link}>
            Home
          </Link>{" "}
        </>
      ) : (
        <>
          <p className={styles.text}>
            Lamentamos, mas não conseguimos encontrar a página que você está
            procurando. Por favor, retorne ao Login e tente novamente.
          </p>
          <Link to={"/"} className={styles.link}>
            Login
          </Link>{" "}
        </>
      )}
    </main>
  );
}
