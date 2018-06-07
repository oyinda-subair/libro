import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(password, salt);
  return password ? hashedPassword : null
};

const token = (info, max) => {
  const secret = process.env.SECRET ? process.env.SECRET : 'thisisademosecret'
  const maxAge = '365d'
  return jwt.sign({
    data: {
      member_id: info.id,
      member_username: info.username,
      member_roles: info.role
    }
  }, secret, {
    expiresIn: max ? maxAge : '7d'
  });
}

export default {
  hashPassword,
  token
}
