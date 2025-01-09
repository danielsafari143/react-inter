import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Typography } from '@mui/material';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async () => {
        await axios.get(`http://localhost:3000/v1/login/${email}`).then((data) => {
            localStorage.setItem("user" , JSON.stringify(data.data.data))
            navigate('/');
        }).catch((error) => {
            console.log(error)
        })
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f0f0'
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#fff',
                    borderRadius: '10px',
                    padding: '3rem',
                    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
                    <LockOutlinedIcon sx={{ color: '#009688', marginRight: '1rem' }} />
                    <Typography variant="h5">Login</Typography>
                </Box>
                <Box>
                    <TextField
                        label="Email"
                        variant="outlined"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        fullWidth
                        sx={{ marginBottom: '2rem' }}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: '#009688',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#007977'
                            }
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;