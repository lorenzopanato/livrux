import style from "./BookDetails.module.scss";

export default function ProductDetails() {
  return (
    <>
      <main className={style.main}>
        <section>
          <img
            src="https://m.media-amazon.com/images/I/815iPX0SgkL._AC_UF1000,1000_QL80_.jpg"
            alt="..."
          />
          <div className={style.bookDetails}>
            <h1>O Poder Do Hábito</h1>
            <div className={style.bookInfo}>
              <div className={style.leftSection}>
                <p>
                  <strong>Autor: </strong>
                  Charles Duhigg
                </p>
                <p>
                  <strong>Editora: </strong>
                  Objetiva
                </p>
              </div>
              <a href="#">Mais informações</a>
            </div>
            <h2>R$ 82,90</h2>
            <div className={style.buttons}>
              <button className={style.buyButton}>Comprar</button>
              <button className={style.cartButton}>
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
