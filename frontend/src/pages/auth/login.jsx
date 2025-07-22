import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useAuth } from '../../context/authContext';
// import { login } from '@/services/api';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login, user, setUserInformation } = useAuth();

  useEffect(() => {
    fetchUser();
  },[]);

  const fetchUser = async () => {
    const token = await localStorage.getItem("token");

    if (token) {
      setUserInformation(token);
      navigate("/dashboard");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert("All fields required");
    setLoading(true);
    try {
      const res = await login(username, password)
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
      if (!res?.token){
        alert("Login failed Again");
        return;
      }
    } catch (err) {
      console.log({err})
      alert(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-zinc-900 px-4">
      <Card className="w-full max-w-md shadow-xl animate-fade">
        
          <h2 className="text-center text-2xl font-bold"></h2>
          <form onSubmit={(e) => handleLogin(e)} className="flex flex-col gap-4 mt-4">
             <input className='p-2 border rounded'
            type="username"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input className='p-2 border rounded'
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
      
          <Button
            label={loading ? 'Logging...' : 'Login'}
            backgroundColor="bg-blue-500"
            disabled={loading}
          />
          </form>

        <p className="text-sm text-center text-zinc-600 dark:text-zinc-300 mt-4">
            Don't have an account?{" "}
            <Link to="/Register" className="text-blue-600 hover:underline">
                Sign Up 
            </Link>
        </p>
      </Card>
    </div>
  );
}