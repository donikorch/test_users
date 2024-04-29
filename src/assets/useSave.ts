import { useState } from 'react';
import axios from 'axios';
import { User } from '../assets/user';

const useSave = (initialUser: User) => {
  const [editedUser, setEditedUser] = useState<User>(initialUser);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes('company')) {
      const field = name.split('.')[1];
      setEditedUser((prevUser) => ({
        ...prevUser,
        company: {
          ...prevUser.company,
          [field]: value,
        },
      }));
    } else {
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const saveUser = async () => {
    try {
      const response = await axios.patch(
        `https://dummyjson.com/users/${editedUser.id}`,
        editedUser
      );
      const updatedUser: User = response.data;
      return updatedUser;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { editedUser, handleInputChange, saveUser };
};

export default useSave;
