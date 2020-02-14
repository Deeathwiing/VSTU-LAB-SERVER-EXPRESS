module.exports = {
  serverPort: process.env.SERVER_PORT,
  secret: process.env.SESSION_SECRET,
  secretKey: process.env.SECRET_KEY,
  dbNameSQL: process.env.DB_NAME_SQL,
  usernameSQL: process.env.DB_USERNAME_SQL,
  passwordSQL: process.env.DB_PASSWORD_SQL,
  hostSQL: process.env.DB_HOST_SQL
};
