import React from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Logo from '../img/logo.png';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import '../style/login.css';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            Marco Castellacci -{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {

    const navigate = useNavigate()
    const [selectCountry, setSelectCountry] = React.useState();

    Swal.fire({
        title: 'Please Select your country',
        input: 'select',
        inputOptions: {
            'Argentina': 'Argentina',
            'Australia': 'Australia',
            'Brazil': 'Brazil',
            'Chile': 'Chile',
            'Colombia': 'Colombia',
            'China': 'China',
            'Mexico': 'Mexico',
            'Germany': 'Germany',
            'France': 'France',
            'India': 'India',
            'Italy': 'Italy',
            'Japan': 'Japan',
            'Korea': 'Korea',
            'Quatar': 'Quatar',
            'England': 'England',
            'EEUU': 'EEUU',
            'Spain': 'Spain',
        },
        inputPlaceholder: 'Select your country',
        inputAttributes: {
            name: 'select-country'
        },
        showCancelButton: false,
        allowOutsideClick: false,
        preConfirm: (country) => {
            setSelectCountry(country)
        },
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value === '') {
                    resolve('You need to select a country')
                } else {
                    resolve()
                }
            })
        },
    }).then((result) => {
        if (result.value) {
            Swal.close()
        }
    })

    function alerts(res) {
        const errormsg = res.data.message
        if (res.data.from === "validator") {
            errormsg.forEach(e => {
                toast.error(e.message)
            })
        }
        if (res.data.from === "form-signup") {
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/signin')
            } else {
                toast.error(res.data.message)
            }
        }
        if (res.data.from === "signup") {
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/signin')
            } else {
                toast.error(res.data.message)
            }
        }
    }

    async function handleGoogleSubmit() {
        const googleProvider = new GoogleAuthProvider();
        googleProvider.setCustomParameters({ prompt: "select_account" });
        await SingInWithGoogle(googleProvider);
        async function SingInWithGoogle(googleProvider) {
            try {
                // eslint-disable-next-line
                const res = await signInWithPopup(auth, googleProvider);
                alerts(res)
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function handleFacebookSubmit() {
        const facebookProvider = new FacebookAuthProvider();
        facebookProvider.setCustomParameters({ 'display': 'popup' })
        await SignInWithFacebook(facebookProvider);
        async function SignInWithFacebook(facebookProvider) {
            try {
                const res = await signInWithPopup(auth, facebookProvider)
                alerts(res)
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const userData = {
            name: event.target[0].value,
            lastName: event.target[2].value,
            image: event.target[4].value,
            email: event.target[6].value,
            password: event.target[8].value,
            country: selectCountry,
            from: 'form-signup'
        }
        console.log(userData);
    };


    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" >
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1653560668256-6e074e914207?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDEyNXxGem8zenVPSE42d3x8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <img src={Logo} alt="Logo" className="logo-sign" />
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                                        required
                                        fullWidth
                                        id="name"
                                        label="First Name"
                                        autoFocus
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="image"
                                        label="Url Image"
                                        name="image"
                                        autoComplete="url image"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        size="small"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, marginY: '1rem' }}
                            >
                                Sign Up
                            </Button>
                            <div className="login">
                                <button className="button" onClick={handleGoogleSubmit}>
                                    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262">
                                        <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                        <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                        <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                                        <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                                    </svg>
                                    Continue with Google
                                </button>
                                <button className="button-face" onClick={handleFacebookSubmit}>
                                    <svg stroke="#ffffff" space="preserve" viewBox="-143 145 512 512" xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Layer_1" version="1.1" fill="#ffffff"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path d="M329,145h-432c-22.1,0-40,17.9-40,40v432c0,22.1,17.9,40,40,40h432c22.1,0,40-17.9,40-40V185C369,162.9,351.1,145,329,145z M169.5,357.6l-2.9,38.3h-39.3v133H77.7v-133H51.2v-38.3h26.5v-25.7c0-11.3,0.3-28.8,8.5-39.7c8.7-11.5,20.6-19.3,41.1-19.3 c33.4,0,47.4,4.8,47.4,4.8l-6.6,39.2c0,0-11-3.2-21.3-3.2c-10.3,0-19.5,3.7-19.5,14v29.9H169.5z"></path> </g></svg>
                                    Continue with Facebook
                                </button>
                            </div>
                            <p className="btn-login">Los datos solicitados seran utilizados unicamente para el inicio de sesion.</p>
                            <Copyright sx={{ mt: 5 }} />
                            <Grid item sx={{ marginY: '1rem' }}>
                                <RouterLink to="/login" style={{ textDecoration: 'none', color: 'blue' }}>
                                    {"Already have an account? Please Sign In"}
                                </RouterLink>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}