import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import UserService from '../../Services/UserManagingService/UserService'; // Ensure the import path is correct
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UserDetail = ({ user, onUserUpdated, onUserDeleted }) => {
  const navigate = useNavigate(); // Initialize useNavigate


  const handleDelete = async () => {
    try {
      await UserService.deleteUser(user.id);
      onUserDeleted(user.id); // Notify the parent component to update the UI
    } catch (error) {
      console.error(`Failed to delete user with ID ${user.id}:`, error);
    }
  };

    const handleUpdateClick = () => {
    navigate(`/update-user/${user.id}`); // Use navigate to redirect to UpdateUserPage
  };

  const handleDeactivate = async () => {
    try {
      await UserService.deactivateUser(user.id);
      console.log(`Deactivating user ${user.id}`); // Debugging line
      onUserUpdated(user.id, { accountNonLocked: false });
    } catch (error) {
      console.error(`Failed to deactivate user with ID ${user.id}:`, error);
    }
  };
  
  const handleActivate = async () => {
    try {
      await UserService.activateUser(user.id);
      console.log(`Activating user ${user.id}`); // Debugging line
      onUserUpdated(user.id, { accountNonLocked: true });
    } catch (error) {
      console.error(`Failed to activate user with ID ${user.id}:`, error);
    }
  };
  
  

  return (
    <li className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow rounded-lg">
  <div className="flex items-center mb-4 md:mb-0 w-full">
    <div className="flex items-center w-full">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3">
        {/* Initials or avatar image */}
        <span>{user.firstName.charAt(0)}{user.lastName.charAt(0)}</span>
      </div>
      <div className="flex-grow">
        <p className="text-lg font-semibold">{user.firstName} {user.lastName}</p>
        <p className="text-sm text-gray-600">ID: {user.id}</p>
      </div>
    </div>

    {/* User data in one row */}
    <div className="flex-grow text-sm md:text-base">
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
      {user.studentId && <p>Student ID: {user.studentId}</p>}
      {user.course && <p>Course: {user.course}</p>}
      {user.enrollmentDate && <p>Enrollment Date: {user.enrollmentDate}</p>}
      <p>Account Status: <span className={user.accountNonLocked ? "text-green-500" : "text-red-500"}>{user.accountNonLocked? 'Enabled' : 'Disabled'}</span></p>
    </div>
  </div>

  {/* Action buttons */}
  <div className="flex items-center">
    {user.accountNonLocked ? (
      <button onClick={handleDeactivate} className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded mr-2">Deactivate</button>
    ) : (
      <button onClick={handleActivate} className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded mr-2">Activate</button>
    )}

    {/* Larger icons */}
    <button onClick={handleUpdateClick} className="text-blue-500 hover:text-blue-600 mr-2 text-2xl">
      <FontAwesomeIcon icon={faEdit} size="lg" />
    </button>
    <button onClick={handleDelete} className="text-red-500 hover:text-red-600 text-2xl">
      <FontAwesomeIcon icon={faTrashAlt} size="lg" />
    </button>
  </div>
</li>

  
  );
};

export default UserDetail;
