import { useState } from "react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ValidateForm";
import { Auth } from "../../../../api/auth";
import "./RegisterForm.scss";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  TextField,
} from "@mui/material";
import { getCssVariable } from "../../../../utils/getColorSass";

const authController = new Auth();

export function RegisterForm({ openLogin }) {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        await authController.register(formValue);
        openLogin();
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
          <TextField
            label="Repetir contraseña"
            name="repeatPassword"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            error={
              formik.touched.repeatPassword &&
              Boolean(formik.errors.repeatPassword)
            }
            helperText={
              formik.touched.repeatPassword && formik.errors.repeatPassword
            }
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="conditionsAccepted"
                  checked={formik.values.conditionsAccepted}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{
                    color:
                      formik.touched.conditionsAccepted &&
                      formik.errors.conditionsAccepted &&
                      `${getCssVariable("--error")}`,
                  }}
                />
              }
              label="He leído y acepto políticas de privacidad"
              sx={{
                color:
                  formik.touched.conditionsAccepted &&
                  formik.errors.conditionsAccepted &&
                  `${getCssVariable("--error")}`,
              }}
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" fullWidth>
            Crear cuenta
          </Button>
        </Grid>
        <Grid item xs={12}>
          <p className="register-form__error">{error}</p>
        </Grid>
      </Grid>
    </Box>
  );
}
