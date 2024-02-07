import bcrypt from 'bcrypt';

export const generateHash = async (password) => {
    const saltRounds = 10; 
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  };

  export const comparePassword = async (password, hash) => {
    const match = await bcrypt.compare(password, hash);
    return match;
  };

export const methodNotAllowed = (req, res, next) => res.status(405).send();

export const isValidEmail = (username) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(username);
};