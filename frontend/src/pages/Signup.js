import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('name', name); 
        formData.append('profilePicture', profilePicture);

        try {
            const res = await axios.post('http://localhost:5000/api/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Registration response:', res.data); 
            setSuccess('Registration Successful');
            setTimeout(() => {
                navigate('/posts');
            }, 2000); 
        } catch (err) {
            console.error('Error registering user:', err.response.data);
            setError(err.response.data);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Signup</h1>
                <form onSubmit={handleSubmit}>
                    {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
                    {success && <p className="text-green-500 mb-4 text-sm">{success}</p>}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className="block w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="block w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            className="block w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="block w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Name (optional)"
                            className="block w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="file"
                            accept="image/*"
                            className="block w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                        Signup
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

