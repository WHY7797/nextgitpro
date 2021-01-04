function getRedisSessionId(sid){
    return `ssid:${sid}`
}
class RedisSessionStore{
    constructor(client){
        this.client=client
    }
    //获取redis中存储的session数据
    async get (sid) {
        console.log('get session'+sid);
        const id = getRedisSessionId(sid)
        const data = await this.client.get(id)
        if(!data){
            return null
        } 
        try {
            const result = JSON.parse(data)
            return result
        }catch(err){
            console.error(err)
        }
    }
    //存储session数据到redis ttl超时删除
    async set (sid,session,ttl) {
        console.log('get session'+sid);
        const id = getRedisSessionId(sid)
        if(typeof ttl ==='number'){
            ttl=Math.ceil(ttl/1000)
        }
        try {
            const sessionStr = JSON.stringify(session)
            if(ttl){
                await this.client.setex(id,ttl,sessionStr)
            }else{
                await this.client.set(id,sessionStr)
            }
            return sessionStr
        }catch(err){
            console.error(err)
        }
    }
    //从redis中删除某个session
    async destory(sid){
        console.log('destory'+sid);
        const id = getRedisSessionId(sid)
        await this.client.del(id)
    }
}