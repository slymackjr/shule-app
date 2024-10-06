import { Link } from "react-router-dom";
import { home, skuliAppLogo } from "../assets/images";


const Parents = () => {
    return (
        <div className="bg-indigo-50 min-h-screen">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/">
                        <img src={skuliAppLogo} alt="SkuliApp Logo" className="w-40"/>
                    </Link>
                </div>
            </header>

            <main className="container mx-auto mt-12 pb-5">
                <div className="flex justify-center">
                    <div className="w-full xl:w-10/12">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="md:flex">
                                <div className="md:w-1/2 p-8">
                                    <h3 className="text-2xl font-bold text-indigo-600 mb-4">Register</h3>
                                    <h6 className="text-lg mb-2">Are you a parent?</h6>
                                    <p className="text-gray-600 mb-5">
                                        Register to our system to follow your children academically.
                                    </p>
                                    
                                    {/* Display errors */}
                                    {/* Add your error display logic here */}

                                    <form method="POST" action="/parentRegistration/store" className="space-y-4">
                                        <div>
                                            <label htmlFor="first_name" className="block text-indigo-600">First Name</label>
                                            <input
                                                name="first_name"
                                                type="text"
                                                className="w-full p-2 border border-indigo-600 rounded-md"
                                                placeholder="Ali"
                                                id="first_name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="middle_name" className="block text-indigo-600">Middle Name (Optional)</label>
                                            <input
                                                name="middle_name"
                                                type="text"
                                                className="w-full p-2 border border-indigo-600 rounded-md"
                                                placeholder="Hussein"
                                                id="middle_name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="last_name" className="block text-indigo-600">Sirname</label>
                                            <input
                                                name="last_name"
                                                type="text"
                                                className="w-full p-2 border border-indigo-600 rounded-md"
                                                placeholder="Mohammed"
                                                id="last_name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-indigo-600">Email (Optional)</label>
                                            <input
                                                name="email"
                                                type="email"
                                                className="w-full p-2 border border-indigo-600 rounded-md"
                                                placeholder="massamugeorge@gmail.com"
                                                id="email"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="student_registration_number" className="block text-indigo-600">Student Registration Number</label>
                                            <input
                                                name="student_registration_number"
                                                type="text"
                                                className="w-full p-2 border border-indigo-600 rounded-md"
                                                placeholder="P244435"
                                                id="student_registration_number"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone_number" className="block text-indigo-600">Phone Number</label>
                                            <input
                                                name="phone_number"
                                                type="text"
                                                className="w-full p-2 border border-indigo-600 rounded-md"
                                                placeholder="0678....."
                                                id="phone_number"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block text-indigo-600">Password</label>
                                            <input
                                                name="password"
                                                type="password"
                                                className="w-full p-2 border border-indigo-600 rounded-md"
                                                id="password"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="con_password" className="block text-indigo-600">Confirm Password</label>
                                            <input
                                                name="con_password"
                                                type="password"
                                                className="w-full p-2 border border-indigo-600 rounded-md"
                                                id="con_password"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition"
                                        >
                                            Register
                                        </button>
                                    </form>

                                    <p className="text-center text-gray-600 mt-4">
                                        Already have an account?{" "}
                                        <a href="/login" className="text-indigo-600 hover:underline">
                                            Login
                                        </a>
                                    </p>
                                </div>

                                <div className="hidden md:block md:w-1/2 bg-indigo-100">
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

export default Parents;
