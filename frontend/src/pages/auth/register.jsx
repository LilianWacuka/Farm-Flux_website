import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { useAuth } from '../../context/authContext'; 

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await register({ username, email, password }); 
      localStorage.setItem("token", res.token);
      navigate('/dashboard'); 
    } catch (err) {
      setError(err.message || 'Registration failed');
    }

    setLoading(false);
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <Card>
        <h2 className='text-2xl font-bold mb-4 text-center text-grey-700'></h2>

        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
            required
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button
            label={loading ? 'Registering...' : 'Register'}
            backgroundColor="bg-blue-500"
            disabled={loading}
          />
        </form>

        <div className="mt-4 text-sm text-center">
          Already have an account?{' '}
          <Link to='/login' className="text-blue-600 hover:underline">
            Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
