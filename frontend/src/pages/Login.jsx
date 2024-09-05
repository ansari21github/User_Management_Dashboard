import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const {login}  = useContext(AuthContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(
        JSON.stringify({
          email: formData.email,
          password: formData.password,
        })
      );
      const response = await fetch("https://user-management-backend-w1az.onrender.com/api/loginuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const json = await response.json();
      console.log(json);
  
      if (!json.success) {
        alert("Enter Valid Credentials");
      }
      if (json.success) {
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("authToken", json.authToken);
        login(json.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      } else {
        alert("Enter Valid Credentials");
      }
    };
  

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Log In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required 
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg"
                    >
                        Log In
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">Create an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link></p>
            </div>
        </div>
    );
};

export default Login;
