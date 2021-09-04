const redis = require('redis');
const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  auth_pass: process.env.REDIS_PASSWORD,
});

client.on('error', (error) => {
  console.log(error);
});

module.exports = client;
