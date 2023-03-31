import { useState } from 'react';

interface LoginForm {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  isValid: () => boolean;
  isInvalid: () => boolean;
}

export function useLoginForm(): LoginForm {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Just checking if both form fields has any data. I'm not checking if the data has valid format.
  // Also, this could be extracted to a custom function that could be unit testes more properly.
  const isValid = () => !!email && !!password;

  const isInvalid = () => !isValid();

  return {
    email,
    password,
    setEmail,
    setPassword,
    isValid,
    isInvalid,
  };
}
