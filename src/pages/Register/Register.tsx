import { Card, TextField } from "@mui/material";
import style from "../../styles/Form.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CustomError, LoginData, RegisterData } from "../../utils/interfaces";
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../Services/registerApi";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useAppDispatch } from "../../hooks/hooks";
import { setToken } from "../../slices/tokenSlice";

const schema = yup.object().shape({
  email: yup.string().required("Obrigatório").email("Email inválido"),
  password: yup.string().required("Obrigatório"),
});

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [registerUser, { data, isLoading, isSuccess, isError, error }] =
    useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (registerData: LoginData) => {
    try {
      await registerUser(registerData);
    } catch (error) {
      console.log("Erro ao efetuar cadastro:", error);
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
  }, [isSuccess, isError, error, data, navigate]);

  return (
    <>
      <main className={style.main}>
        <section className={style.loginContainer}>
          <div className={style.formContainer}>
            <h1 className={style.title}>Livrux</h1>
            <h2 className={style.subtitle}>Cadastre-se</h2>

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
                  Cadastrar
                </LoadingButton>

                <div className={style.formLinks}>
                  <p className={style.haveAccount}>
                    Já possui uma conta?{" "}
                    <Link to={"/login"} className={style.link}>
                      Login
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
