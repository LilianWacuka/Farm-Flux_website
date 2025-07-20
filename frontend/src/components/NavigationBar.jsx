import { Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/authContext'
export default function NavigationBar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const logoutUser = () => {
     localStorage.removeItem('token');
     logout()
     navigate('/login')
     
  }
  
    return (
    <div className="flex justify-between bg-[#3fa63f] p-6 text-white">
      <h1 className='font-bold'>FARM PROJECT</h1>
      <div className="flex gap-2">
        {
          user ? (
          <>
            <Link to="/dashboard" className="font-bold text-xl">Dashboard</Link>
            <Link to="/transaction" className="font-bold text-xl">Transaction</Link>
            <button onClick={logoutUser} className="font-bold text-xl">Logout</button>
          </>
          )
        :
          <>
            <Link to="/login" className="font-bold text-xl">Login</Link>
            <Link to="/register" className="font-bold text-xl">Register</Link>
          </>
        }
      </div>
    </div>
  )
}