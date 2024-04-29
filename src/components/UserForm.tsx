import React from 'react';
import { User } from '../assets/user';

interface UserFormProps {
  editedUser: User;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UserForm: React.FC<UserFormProps> = ({ editedUser, onInputChange }) => {
  return (
    <div>
      <p>
        Имя:{' '}
        <input
          type='text'
          name='firstName'
          value={editedUser.firstName}
          onChange={onInputChange}
        />
      </p>
      <p>
        Фамилия:{' '}
        <input
          type='text'
          name='lastName'
          value={editedUser.lastName}
          onChange={onInputChange}
        />
      </p>
      <p>
        Должность:{' '}
        <input
          type='text'
          name='company.title'
          value={editedUser.company.title}
          onChange={onInputChange}
        />
      </p>
      <p>
        Отдел:{' '}
        <input
          type='text'
          name='company.department'
          value={editedUser.company.department}
          onChange={onInputChange}
        />
      </p>
      <p>
        Компания:{' '}
        <input
          type='text'
          name='company.name'
          value={editedUser.company.name}
          onChange={onInputChange}
        />
      </p>
    </div>
  );
};

export default UserForm;
