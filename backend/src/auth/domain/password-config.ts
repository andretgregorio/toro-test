export const passwordConfig = {
  minLength: 8,
  allowedCharactersRegex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]+)$/,
  minUpperCase: 1,
  minLowerCase: 1,
  minNumbers: 1,
  minSpecialChars: 0,
};
