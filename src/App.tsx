import { useEffect, useState } from 'react';
import { useLoad } from './assets/useLoad';
import { User } from './assets/user';
import { useScroll } from './assets/useScroll';
import './App.css';
import UserItem from './components/UserItem';
import UserInfo from './components/UserInfo';

function App(): JSX.Element {
  const [load, setLoad] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userInfoVisible, setUserInfoVisible] = useState<boolean>(false);
  const loadedUsers: User[] = useLoad(load);

  useEffect(() => {
    setUsers(loadedUsers);
  }, [loadedUsers]);

  const scrollContainerRef = useScroll(() => {
    setLoad((prevLoad) => (prevLoad === 90 ? 0 : prevLoad + 10));
  });

  const handleUserClick = (user: User) => {
    if (selectedUser === user && userInfoVisible) {
      setUserInfoVisible(false);
      setSelectedUser(null);
    } else {
      setSelectedUser(user);
      setUserInfoVisible(true);
    }
  };

  const handleSaveUserInfo = (editedUser: User) => {
    const updatedUsers = users.map((user) =>
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
    setUserInfoVisible(false);
  };

  return (
    <>
      <div className='container'>
        <div className='users-list' ref={scrollContainerRef}>
          {users.map((user: User, index: number) => (
            <UserItem
              key={index}
              user={user}
              onClick={() => handleUserClick(user)}
            />
          ))}
        </div>
        <div className={`user-info ${userInfoVisible ? 'visible' : ''}`}>
          {selectedUser && (
            <UserInfo user={selectedUser} onSave={handleSaveUserInfo} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
