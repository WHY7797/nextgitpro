const Koa =require('koa')
const Router =require('koa-router')
const next=require('next')
const dev=process.env.NODE_ENV!=='production'
const app=next({dev})
const handle =app.getRequestHandler()
console.log(app);
app.prepare().then(()=>{
    const server= new Koa()
    const router= new Router()
    router.get('/a/:id',async (ctx)=>{
        const id = ctx.params.id
        await handle(ctx.req,ctx.res,{
            pathname:"/a",
            query:{id}
        })
        // ctx.body ='<span>asdasd</span>'
        ctx.respond=false
    })
    server.use(router.routes())
    server.use(async (ctx,next)=>{
        await handle(ctx.req,ctx.res)
        ctx.respond=false
    })
    server.listen(3000,()=>{
        console.log('koa server listening 3000')
    })
    // server.use(async (ctx,next)=>{
    //     const path = ctx.path
    //     const method = ctx.method
        
    //     ctx.body='<span>koa render</span>'+path+method
    //     await next()
    // })

    // server.use(async (ctx,next)=>{
    //     ctx.body='<span>koa render2</span>'
    // })
})