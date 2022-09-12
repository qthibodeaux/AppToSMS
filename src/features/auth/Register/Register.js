import { Button, TextField, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../authSlice'
import { useRegisterMutation } from '../authApiSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import './Register.css'

const schema = yup.object({
    username: yup.string().min(1, "Must be at least 1 character long.").required("Username is required."),
    password: yup.string().min(6, "Must be at least 6 characters long.").required("Password is required."),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match.')
}).required()

function Register() {
    const [register] = useRegisterMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { control, handleSubmit, formState: { errors} } = useForm({
        defaultValues: {
            username: '',
            password: '',
            confirm: ''
        },
        resolver: yupResolver(schema)
      });

    const onSubmit = async (data) => {
        console.log(data)
        try {
            let username = data.username
            let password = data.password
            const response = await register({ username, password }).unwrap()
            dispatch(setCredentials({ response }))
            navigate('/home')
        } catch (error) {
            if (!error?.response) {
                console.log('No Server Response');
            } else if (error.response?.status === 409) {
                console.log('Username Taken');
            } else {
                console.log('Registration Failed')
            }
        }
    }

  return (
    <div className='regBox'>
        <form className='regForm' onSubmit={handleSubmit(onSubmit)}>
            <Typography variant='h2' className='regHeadline txt'>
                AppToSMS
            </Typography>

            <div className='regDiv'>
                <Typography variant='h5' className='labeltxt txt'>
                    Register
                </Typography>
                <Controller
                    name='username'
                    control={control}
                    render={ ({ field }) =>
                        <TextField
                            required
                            id='standard-helpText'
                            label='Username'
                            variant='standard'
                            error={errors.username ? true : false}
                            helperText={errors.username?.message}
                            {...field}
                        />
                    }
                />
                <Controller 
                    name='password'
                    control={control}
                    render={ ({ field }) => 
                        <TextField
                            required 
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            error={errors.password ? true : false}
                            helperText={errors.password?.message}
                            variant="standard" { ...field } 
                        /> 
                    }
                />
                <Controller 
                    name='confirm'
                    control={control}
                    render={ ({ field })  =>
                        <TextField 
                            required
                            id='standard-password-input'
                            label='Confirm Password'
                            type='password'
                            autoComplete="confirm-password"
                            variant='standard'
                            error={ errors.confirm ? true : false }
                            helperText={errors.confirm?.message}
                            { ...field }
                        />
                    }
                />
                    <div>
                        <Button style={{ background: 'var(--color-1)' }} variant='contained' type='submit'>Submit</Button>
                    </div>
            </div>
        </form>
        <span><Typography type='body3'>Already have an account? <Link to='/login'>Log In</Link></Typography></span>
    </div>
  )
}

export default Register