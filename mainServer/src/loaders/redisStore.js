const redis = require("redis");
const session = require("express-session");

let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient(6379, "redis");
sessionStore = new RedisStore({
  host: "redis",
  port: 6379,
  client: redisClient,
});

module.exports = sessionStore;
