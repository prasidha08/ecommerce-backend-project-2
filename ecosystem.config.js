module.exports = {
    apps : [{
      name   : "ecommerce-app",
      script : "./index.js"
    }],
    env_production: {
      NODE_ENV: "production"
   },
   env_development: {
      NODE_ENV: "development"
   }
  }