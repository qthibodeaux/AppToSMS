import { Button, TextField, Typography } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../authApiSlice'
import { setCredentials } from '../authSlice'
import { useDispatch } from 'react-redux'
import './Login.css'

function Login() {
  const [login] = useLoginMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()


    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            password: ''
        }
      });

    const onSubmit = async (data) => {
      let username = data.username
      let password = data.password
      try {
        const response = await login({ username, password }).unwrap()
        dispatch(setCredentials({ response }))
        navigate('/home')
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <div className='logBox'>
      <form className='logForm' onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h2' className='regHeadline txt'>
                AppToSMS
            </Typography>
        <div className='logDiv'>
          <Typography variant='h5' className='labeltxt txt'>
            Login
          </Typography>
          <Controller 
            name='username'
            control={control}
            render={({ field }) => <TextField required id='standard-helpText' label='Username' variant='standard' {...field} /> }
          />
          <Controller 
            name='password'
            control={control}
            render={({ field }) => 
            <TextField
                required 
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard" {...field} /> }
            />
          <div>
            <Button variant='contained' style={{ background: 'var(--color-1)' }} type='submit'>Submit</Button>
          </div>
        </div>
      </form>
      <span><Typography>Need an account? <Link to='/register'>Register</Link></Typography></span>
    </div>
    
  )
}

export default Login