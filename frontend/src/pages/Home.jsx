

import React, { useContext, useState } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import { AuthContext } from '../components/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user, logout } = useContext(AuthContext);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const handleDelete = (id) => {
        axios.delete(`https://user-management-backend-w1az.onrender.com/api/users/${id}`)
            .then(() => {
                window.location.reload();
            })
            .catch(error => console.error(error));
    };

    const handleFormSubmit = (user) => {
        if (user._id) {
            // Update user
            axios.put(`https://user-management-backend-w1az.onrender.com/api/users/${user._id}`, user)
                .then(() => {
                    setSelectedUser(null);
                    window.location.reload();
                })
                .catch(error => console.error(error));
        } else {
            // Create new user
            axios.post('https://user-management-backend-w1az.onrender.com/api/users', user)
                .then(() => {
                    window.location.reload();
                })
                .catch(error => console.error(error));
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <nav className="bg-gray-100 p-4 shadow-md flex justify-between items-center">
                <div>
                <h1 className="text-xl font-bold">User Management Dashboard</h1>
                <h3>{localStorage.getItem('userEmail')}</h3>
                </div>
                
                <div className="flex items-center">
                    {/* <p className="mr-4">{user?.email}</p> */}
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>
            <div className="flex-grow container mx-auto bg-white p-6 rounded-lg shadow-lg">
                <UserForm selectedUser={selectedUser} onFormSubmit={handleFormSubmit} />
                <div className="mt-6">
                    <UserTable onEdit={handleEdit} onDelete={handleDelete} />
                </div>
            </div>
        </div>
    );
};

export default Home;
