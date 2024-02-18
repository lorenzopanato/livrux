import {
  Basket,
  BookBookmark,
  MagnifyingGlass,
  SignOut,
} from "@phosphor-icons/react";
import style from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { removeToken } from "../../slices/tokenSlice";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { searchBooks } from "../../slices/booksSlice";

export default function Header() {
  const token = useAppSelector((state) => state.token.token);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(removeToken());
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(searchBooks(event.target.value));

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
          {token && (
            <div className={style.searchBar}>
              <MagnifyingGlass size={23} color="var(--text-dark)" />
              <InputBase
                placeholder="O que você está procurando?"
                sx={{ width: "100%" }}
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearch}
              />
            </div>
          )}
          {token && (
            <div className={style.links}>
              <Link to={"/cart"} className={style.navItem}>
                <Basket size={28} />
                Carrinho
              </Link>
              <button className={style.navItem} onClick={handleLogout}>
                <SignOut size={28} />
                Sair
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
