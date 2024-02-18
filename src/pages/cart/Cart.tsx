import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import styles from "./Cart.module.scss";
import { totalCartPrice, removeCartBook } from "../../slices/cartSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { House, X } from "@phosphor-icons/react";
import { Card } from "@mui/material";

export default function Cart() {
  const cart = useAppSelector((state) => state.cart.cart);
  const price = useAppSelector((state) => state.cart.cartPrice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(totalCartPrice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCartPrice]);

  function handleQuantityChange(bookId: string, value: number): void {
    dispatch(removeCartBook({ id: bookId, quantity: value }));
    dispatch(totalCartPrice());
  }

  return (
    <main className={styles.main}>
      <h2>Seu Carrinho!</h2>

      {cart.length > 0 ? (
        <Card className={styles.Card}>
          {cart.map((book) => (
            <div className={styles.itemContainer} key={book.id}>
              <div className={styles.itemInfo}>
                <div className={styles.titleContainer}>
                  <span className={styles.title}>{book.volumeInfo.title}</span>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleQuantityChange(book.id, 0)}
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className={styles.detailsContainer}>
                  <select
                    name="Quantity"
                    id={"Quantity " + book.id}
                    value={book.quantity}
                    onChange={(e) =>
                      handleQuantityChange(book.id, parseInt(e.target.value))
                    }
                  >
                    {[...Array(10)].map((_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                  <span className={styles.price}>
                    Preço:{" "}
                    {Number(book.saleInfo.listPrice?.amount) * book.quantity}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <p className={styles.totalPrice}>Preço total: {price}</p>
          <button
            className={styles.checkoutButton}
            disabled={cart.length === 0}
          >
            Continuar para o pagamento
          </button>
        </Card>
      ) : (
        <div className={styles.emptyCart}>
          <Card className={styles.Card}>
            <p>
              Seu carrinho está vazio! Adicione itens para prosseguir ao
              pagamento.
            </p>
            <Link to="/" className={styles.goBackLink}>
              <House size={16} />
              Voltar para a página inicial
            </Link>
          </Card>
        </div>
      )}
    </main>
  );
}
