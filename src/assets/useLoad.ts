import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import type { User } from './user';

async function getUsers(n: number): Promise<User[]> {
  const res: AxiosResponse = await axios.get(
    `https://dummyjson.com/users?limit=10&skip=${n}`
  );
  return res.data.users;
}

export function useLoad(m: number): User[] {
  const [users, setUsers] = useState<User[] | []>([]);

  useEffect(() => {
    getUsers(m)
      .then((data) => setUsers((prev) => [...prev, ...data]))
      .catch(console.log);
  }, [m]);

  return users;
}
