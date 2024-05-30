import { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ValidateForm";
import { Auth } from "../../../../api/auth";
import "./LoginForm.scss";
import { useAuth } from "../../../../hooks";

const authController = new Auth();

export function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        const { access, refresh } = await authController.login(formValue);
        authController.setAccessToken(access);
        authController.setRefreshToken(refresh);

        login(access);
      } catch (error) {
        setError("Error en el servidor");
        console.error(error);
      }
    },
  });
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo electronico"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.password}
      />

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Entrar
      </Form.Button>
      <p className="login-form__error">{error}</p>
    </Form>
  );
}
