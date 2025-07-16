import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import PageWrapper from '../components/PageWrapper';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('auth/login', { email, password });
            const token = response.data.token;
            localStorage.setItem("token", token);
            navigate("/notes");
        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid email or password");
        }
    };

    return (
        <PageWrapper>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label><br />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginTop: 10 }}>
                    <label>Password:</label><br />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button style={{ marginTop: 20 }} type="submit">Login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </PageWrapper>
    );
};

export default LoginPage;