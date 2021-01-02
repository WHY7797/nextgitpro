async function test() {
  const Redis = require("ioredis")
  const redis = new Redis({ port: 6379, db: 0 })
  const res = await redis.keys("*")
  const res2 = await redis.set("c", 123)
  const res3 = await redis.get("c")
  console.log(res)
  console.log(res2)
  console.log(res3)
}
test();
