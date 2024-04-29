import React from 'react';
import { User } from '../assets/user';

interface UserItemProps {
  user: User;
  onClick: () => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onClick }) => {
  return (
    <div className='user-item' onClick={onClick}>
      <p>
        {user.firstName} {user.lastName}
      </p>
    </div>
  );
};

export default UserItem;
