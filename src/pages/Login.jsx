import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { home, skuliAppLogo } from "../assets/images";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Clear previous error
        setError(null);
    
        try {
            // Make request to Laravel API for login
            const response = await axios.post("http://51.222.207.88:8005/api/v1/login", {
                email,
                password
            });
    
            // Log the entire response to check where the token is
    
            // Store token in localStorage (assuming the token is inside response.data)
            const token = response.data.access_token; // Adjust if the token is located elsewhere in the response
            if (token) {
                localStorage.setItem("authToken", token);
                console.log('Token stored:', token);
            } else {
                console.error('No token found in the response.');
            }
    
            // Redirect to home page or dashboard
            navigate("/admin-dashboard");
    
        } catch (err) {
            // Handle errors from Laravel API
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };
    
    return (
        <div className="bg-indigo-50 min-h-screen">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/">
                        <img src={skuliAppLogo} alt="SkuliApp Logo" className="w-40" />
                    </Link>
                </div>
            </header>

            <main className="container mx-auto mt-12 pb-5">
                <div className="flex justify-center">
                    <div className="w-full xl:w-10/12">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-1/2 p-8">
                                    <h3 className="text-2xl font-bold text-indigo-600 mb-4">Login</h3>
                                    <p className="text-gray-600 mb-5">
                                        Please enter your credentials to log in.
                                    </p>

                                    {/* Display error message */}
                                    {error && (
                                        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="email" className="block text-indigo-600">Email</label>
                                            <input
                                                type="email"
                                                className="w-full p-2 border border-indigo-600 rounded-md"
                                                placeholder="youremail@example.com"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block text-indigo-600">Password</label>
                                            <input
                                                type="password"
                                                className="w-full p-2 border border-indigo-600 rounded-md"
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition"
                                        >
                                            Login
                                        </button>
                                    </form>

                                    <p className="text-center text-gray-600 mt-4">
                                        Don't have an account?{" "}
                                        <Link to="/register" className="text-indigo-600 hover:underline">
                                            Register
                                        </Link>
                                    </p>
                                </div>

                                <div className="hidden md:block md:w-1/2 bg-indigo-100">
                                    {/* Replace with appropriate image */}
                                    <img
                                        src={home}
                                        alt="Hero Image"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-indigo-100 py-4">
                <div className="container mx-auto text-center">
                    <div className="flex justify-between">
                        <p className="text-gray-600">&copy; 2024 Altus Smart Solution. All Rights Reserved.</p>
                        <p className="text-gray-600">Developed & Powered by: Altus Smart Solution</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Login;
