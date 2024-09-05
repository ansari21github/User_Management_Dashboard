

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserTable = ({ onEdit, onDelete }) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 12;

    useEffect(() => {
        axios.get('https://user-management-backend-w1az.onrender.com/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error(error));
    }, []);

    // Get current users for the page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Pagination controls
    const totalPages = Math.ceil(users.length / usersPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-gray-300">
                <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 border-b text-left text-gray-600">ID</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">First Name</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Last Name</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Email</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Department</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentUsers.map(user => (
                            <tr key={user._id}>
                                <td className="py-2 px-4 border-b text-gray-800">{user._id}</td>
                                <td className="py-2 px-4 border-b text-gray-800">{user.firstName}</td>
                                <td className="py-2 px-4 border-b text-gray-800">{user.lastName}</td>
                                <td className="py-2 px-4 border-b text-gray-800">{user.email}</td>
                                <td className="py-2 px-4 border-b text-gray-800">{user.department}</td>
                                <td className="py-2 px-4 border-b">
                                    <button 
                                        onClick={() => onEdit(user)} 
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-lg mr-2 transition duration-300">
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => onDelete(user._id)} 
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-lg transition duration-300">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4 space-x-2">
                <button 
                    onClick={prevPage} 
                    disabled={currentPage === 1} 
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded disabled:opacity-50">
                    Previous
                </button>
                <span className="font-semibold text-gray-800">Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={nextPage} 
                    disabled={currentPage === totalPages} 
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>
    );
};

export default UserTable;
