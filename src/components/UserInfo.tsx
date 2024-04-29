import React, { useState, useEffect } from 'react';
import { User } from '../assets/user';
import UserForm from './UserForm';
import useSave from '../assets/useSave';

interface UserInfoProps {
  user: User;
  onSave: (editedUser: User) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, onSave }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { editedUser, handleInputChange, saveUser } = useSave(user);

  useEffect(() => {
    handleInputChange({
      target: { name: 'reset', value: '' },
    } as React.ChangeEvent<HTMLInputElement>);
  }, [user, handleInputChange]);

  const handleSave = async () => {
    try {
      const updatedUser = await saveUser();
      onSave(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          <p>
            Имя: {user.firstName} {user.lastName}
          </p>
          <p>Должность: {user.company.title}</p>
          <p>Отдел: {user.company.department}</p>
          <p>Компания: {user.company.name}</p>
          <button onClick={() => setIsEditing(true)}>Изменить</button>
        </div>
      ) : (
        <div>
          <UserForm editedUser={editedUser} onInputChange={handleInputChange} />
          <button onClick={handleSave}>Сохранить</button>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
