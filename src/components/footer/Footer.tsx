import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <>
      <footer className={style.footer}>
        <p className={style.footerText}>
          Livrux © Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
}
