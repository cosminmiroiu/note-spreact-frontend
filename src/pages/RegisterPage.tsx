import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';
import PageWrapper from '../components/PageWrapper';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.post('/auth/register', { name, email, password });
            navigate('/login');
        } catch (err) {
            console.error('Registration failed:', err);
            setError(err instanceof Error && err.message ? err.message : 'Something went wrong. Maybe the email is already used.');
        }
    };

    return (
        <PageWrapper>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name:</label><br />
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>Email:</label><br />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>Password:</label><br />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button style={{ marginTop: 20 }} type="submit">Register</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </PageWrapper>
    );
};

export default RegisterPage;