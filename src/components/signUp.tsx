import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
// import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, TextField } from '@mui/material';


interface SignUpFormValues {
    username: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>();

    const onSubmit: SubmitHandler<SignUpFormValues> = async data => {
        try {
            const response = await fetch('http://ec2-3-120-248-65.eu-central-1.compute.amazonaws.com/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form 
        onSubmit={handleSubmit(onSubmit)}
        style={{"display": 'flex', "alignItems" : "center", 'justifyContent' : 'center', 'flexDirection': 'column'}}
        >
            <div>
                <h1>Registration form</h1>
            </div>
            <div>
                <TextField
                    sx={{ m: 1, width: '25ch' }}
                    id="email"
                    label="Email"
                    variant="standard"
                    type='email'
                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ''}

                >
                    {errors.email && <span>{errors.email.message}</span>}

                </TextField>
            </div>


            <div>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input
                        id="standard-adornment-password"
                        {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    color='secondary'
                                >

                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </FormControl>
            </div>

            <div>
                <TextField
                    sx={{ m: 1, width: '25ch' }}
                    id="username"
                    label="Username"
                    variant="standard"
                    error={!!errors.username}
                    helperText={errors.username ? errors.username.message : ''}
                    {...register('username', { required: 'Username is required' })}
                >
                    {errors.username && <span>{errors.username.message}</span>}

                </TextField>
            </div>

            <Button
                type="submit"
                variant="outlined"
                color='secondary'>
                Sign Up
            </Button>
        </form>
    );
};

export default SignUp;
