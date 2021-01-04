const Koa =require('koa')
const session =require('koa-session')
const Router =require('koa-router')
const next=require('next')
const dev=process.env.NODE_ENV!=='production'
const app=next({dev})
const handle =app.getRequestHandler()
console.log(app);
app.prepare().then(()=>{
    const server= new Koa()
    const router= new Router()
    server.keys = ['why','dev','githubsii']
    const SESSION_CONFIG={
        key:'jid',
        // store:{}
    }
    server.use(session(SESSION_CONFIG,server))
    server.use(async(ctx,next)=>{
        // console.log(ctx.cookies.get('id'));
        // //获取用户数据 module.getUserById(id)
        // ctx.session = ctx.session || {}
        // ctx.session.user={
        //     username:'why',
        //     age:'18'
        // }
        // if(!ctx.session.user){
        //     ctx.session.user={
        //         username:'why',
        //         age:'18'
        //     }
        // }
        // else{
            console.log('session is'+ctx.session)
        // }
        // await next()
    })
    router.get('/a/:id',async (ctx)=>{
        const id = ctx.params.id
        await handle(ctx.req,ctx.res,{
            pathname:"/a",
            query:{id}
        })
        // ctx.body ='<span>asdasd</span>'
        ctx.respond=false
    })
    router.get('/set/user',async (ctx)=>{
        ctx.session.user={
            name:'whjocky',
            age:'18'
        }
        ctx.body ='<span>set session success</span>'
    })
    server.use(router.routes())
    server.use(async (ctx,next)=>{
        ctx.cookies.set('id','userid:xxxxxx',{
            httpOnly:false,
        })//设置cookie
        await handle(ctx.req,ctx.res)
        ctx.respond=false
    })
    server.listen(3000,()=>{
        console.log('koa server listening 3000')
    })
})