import { Card, TextField } from "@mui/material";
import style from "../../styles/Form.module.scss";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterData } from "../../utils/interfaces";
import { LoadingButton } from "@mui/lab";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().required("Obrigatório").email("Email inválido"),
  password: yup.string().required("Obrigatório"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    
  }

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
                  //loading={isLoading}
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
