import React, { useState, useEffect } from 'react';
import UserService from '../../Services/UserManagingService/UserService'; // Ensure the import path is correct
import UserDetail from './UserDetail'; // Ensure the import path is correct

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedUsers = await UserService.getAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserDeleted = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleUserUpdated = (userId, updatedProperties) => {
    console.log(`Updating user ${userId} with properties:`, updatedProperties); // Add this line for debugging
    setUsers(users.map(user => {
      if (user.id === userId) {
        return { ...user, ...updatedProperties };
      }
      return user;
    }));
  };
  

  if (isLoading) return <div>Loading users...</div>;
  if (error) return <div>Error fetching users: {error}</div>;

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map(user => (
          <UserDetail
            key={user.id}
            user={user}
            onUserUpdated={(userId, updatedProperties) => handleUserUpdated(userId, updatedProperties)}
            onUserDeleted={handleUserDeleted}
          />
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
