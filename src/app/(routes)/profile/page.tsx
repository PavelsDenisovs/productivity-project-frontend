"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
}

const fetchUsers = async () => {
  const response = await fetch('http://localhost:4000/api/users/', {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Page = () => {
  const { data, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled: false,
  });

  const handleClick = async () => {
    try {
      const result = await refetch();
      console.log("Data from server:", result.data); // вывод данных
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Get Users</button>
      {data && data.map((user: User) => (
      <div key={user.id}>
        <p>{user.name}</p>
      </div>
    ))}
    </div>
  )
}

export default Page;