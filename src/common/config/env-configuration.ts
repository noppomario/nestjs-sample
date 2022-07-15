export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  DB_PATH_USERS: process.env.DB_PATH_USERS || 'db/users.db',
});
