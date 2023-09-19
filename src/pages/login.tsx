import React from "react"
import { Container, Typography, TextField, Button, Grid, Paper, Link } from "@mui/material"
import { useForm, SubmitHandler, Controller } from "react-hook-form"

const LoginPage: React.FC = () => {
  const { control, handleSubmit } = useForm()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
    // Handle login logic here (e.g., sending login data to the server)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: 20 }}>
            Login
          </Button>
        </form>
        <Link href="/register" style={{ marginTop: 10 }}>
          Don't have an account? Register here.
        </Link>
      </Paper>
    </Container>
  )
}

export default LoginPage
