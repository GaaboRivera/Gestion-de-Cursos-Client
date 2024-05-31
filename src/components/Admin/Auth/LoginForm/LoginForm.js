import { useState } from "react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ValidateForm";
import { Auth } from "../../../../api/auth";
import { useAuth } from "../../../../hooks";
import { Box, Button, Grid, TextField } from "@mui/material";
import "./LoginForm.scss";

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
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Correo electrónico"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Entrar
          </Button>
        </Grid>
        <Grid item xs={12}>
          <p className="login-form__error">{error}</p>
        </Grid>
      </Grid>
    </Box>
  );
}
