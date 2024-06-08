import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ValidateForm";
import "./UserForm.scss";

export function UserForm(props) {
  const { close, onReload, user } = props;
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setError("");
        console.log(formValue);
        // const { access, refresh } = await authController.login(formValue);
        // authController.setAccessToken(access);
        // authController.setRefreshToken(refresh);
        // login(access);
      } catch (error) {
        setError("Error en el servidor");
        console.error(error);
      }
    },
  });

  return (
    <Box component={"form"} onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Nombre"
            name="firstName"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Apellidos"
            name="lastName"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
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
        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formik.values.role}
              label="Age"
              onChange={(data) =>
                formik.setFieldValue("role", data.target.value)
              }
              error={formik.touched.role && Boolean(formik.errors.role)}
            >
              {roleOptions.map((opt) => {
                return (
                  <MenuItem value={opt.value} key={opt.key}>
                    {opt.text}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
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
            {user ? "Actualizar Usuario" : "Crear usuario"}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <p className="login-form__error">{error}</p>
        </Grid>
      </Grid>
    </Box>
  );
}

const roleOptions = [
  {
    key: "user",
    text: "Usuario",
    value: "user",
  },
  {
    key: "admin",
    text: "Administrador",
    value: "admin",
  },
];
