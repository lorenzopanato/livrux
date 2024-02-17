import { Card, TextField } from "@mui/material";
import style from "../../styles/Form.module.scss";
import { CustomError, LoginData } from "../../utils/interfaces";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../Services/loginApi";
import { useAppDispatch } from "../../hooks/hooks";
import { useEffect } from "react";
import { setToken } from "../../slices/tokenSlice";
import { enqueueSnackbar } from "notistack";

const schema = yup.object().shape({
  email: yup.string().required("Obrigatório").email("Email inválido"),
  password: yup.string().required("Obrigatório"),
});

export default function Login() {
  const navigate = useNavigate();
  const [loginUser, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (dataLogin: LoginData) => {
    try {
      await loginUser(dataLogin);
    } catch (error) {
      console.error("Login falhou:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setToken(data.token));
      enqueueSnackbar("Bem-vindo!", { variant: "success" });
      navigate("/");
    }
    if (isError) {
      const customError = error as CustomError;
      enqueueSnackbar("Erro! " + customError.data.error, { variant: "error" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError, isSuccess, navigate]);

  return (
    <>
      <main className={style.main}>
        <section className={style.loginContainer}>
          <div className={style.formContainer}>
            <h1 className={style.title}>Livrux</h1>
            <h2 className={style.subtitle}>Entrar</h2>

            <Card className={style.card}>
              <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                <div className={style.field}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="filled"
                    color="primary"
                    className={style.input}
                    error={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div className={style.field}>
                  <TextField
                    id="password"
                    label="Senha"
                    variant="filled"
                    color="primary"
                    type="password"
                    error={!!errors.password}
                    className={style.input}
                    {...register("password")}
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </div>

                <LoadingButton
                  variant="contained"
                  size="large"
                  className={style.buttonLogin}
                  type="submit"
                  loading={isLoading}
                  loadingPosition="center"
                >
                  Entrar
                </LoadingButton>

                <div className={style.formLinks}>
                  <p className={style.haveAccount}>
                    Não possui uma conta?{" "}
                    <Link to={"/register"} className={style.link}>
                      Cadastre-se
                    </Link>
                  </p>
                </div>
              </form>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
