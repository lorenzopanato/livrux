import {
  Basket,
  BookBookmark,
  FilmSlate,
  ShoppingCart,
  SignOut,
  User,
} from "@phosphor-icons/react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header className={style.header}>
        <div className={style.navBar}>
          <div className={style.containerTile}>
            <BookBookmark size={32} />
            <Link to={"/"} className={style.linkFilmex}>
              Livrux
            </Link>
          </div>
          <div className={style.links}>
            <Link to={"/login"} className={style.navItem}>
              <User size={32} />
              Entrar
            </Link>
            <Link to={"/cart"} className={style.navItem}>
              <Basket size={32} />
              Carrinho
            </Link>
            {/* <button className={style.logoutButton}>
              Sair <SignOut size={22} className={style.icon} />
            </button> */}
          </div>
        </div>
      </header>
    </>
  );
}
