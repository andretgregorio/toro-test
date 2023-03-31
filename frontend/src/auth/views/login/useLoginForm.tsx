import { useState } from 'react';

interface LoginForm {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
}

export function useLoginForm(): LoginForm {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return {
    email,
    password,
    setEmail,
    setPassword,
  };
}
