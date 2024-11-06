"use client"

import React, { useState } from 'react';

const SignInForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    console.log(e);
  };

  return (
    <form>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required
        />
      </div>
      <button type="submit" onSubmit={handleSignIn}>Sign In</button>
    </form>
  );
};

export default SignInForm;