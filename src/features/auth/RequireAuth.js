import { Navigate, Outlet } from 'react-router-dom'
import { selectCurrentToken } from './authSlice'
import { useSelector } from 'react-redux'

function RequireAuth () {
    const token = useSelector(selectCurrentToken)

    return (
        token
            ? <Outlet />
            : <Navigate to='/login' replace />
    )
}

export default RequireAuth