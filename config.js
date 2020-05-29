const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.MONGODB_URI || 'mongodb://tai:taitai1@ds147180.mlab.com:47180/tai',
  JwtSecret: process.env.JWT_SERCRET || 'secret'
};

export default config;
