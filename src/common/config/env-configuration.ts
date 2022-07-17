/**
 * デフォルト設定
 */
export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  DB_PATH_USERS: process.env.DB_PATH_USERS || 'db/users.db',
  FILE_PATH_GLOBAL_CONFIG:
    process.env.FILE_PATH_GLOBAL_CONFIG || 'db/global-config.conf',
});
