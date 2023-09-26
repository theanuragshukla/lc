import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const BASE_URL = "http://localhost:8080";

const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const user = {
        email: data.get('email'),
        password: data.get('password'),
    }

    console.log(user);

    try{
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',          
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const res = await response.json();

        if(!res.status){
            throw new Error(res.msg);
        }

        console.log("Logged in successfully");
        // TODO
        // Store friends list in local storage
        localStorage.setItem("username", user.username);
        localStorage.setItem("auth-token", res.authtoken);
    }catch(error){
        console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                LC
            </Avatar>
            
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Login
                </Button>
                
                <Stack flexDirection={"row"} justifyContent={"center"}>
                    <Link href="/signup" variant="body2" textAlign={"center"}>
                        {"Don't have an account? signup"}
                    </Link>
                </Stack>
            
            </Box>
        </Box>
    </Container>
  );
}

export default Login;