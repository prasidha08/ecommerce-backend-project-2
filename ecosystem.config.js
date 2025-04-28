module.exports = {
    apps : [{
      name   : "ecommerce-app",
      script : "dist/src/index.js",
      args: 'start:prod'
    }],
    env_production: {
      NODE_ENV: "production"
   },
   env_development: {
      NODE_ENV: "development"
   }
  }