const Koa =require('koa')
const Router =require('koa-router')
const next=require('next')
const dev=process.env.NODE_ENV!=='production'
const app=next({dev})
const handle =app.getRequestHandler()
// app.prepare().then(()=>{
    const server=new Koa()
    const router=new Router()
    router.get('/test/:id',(ctx)=>{
        
        // ctx.body='<span>router</span>'+ctx.params.id
        ctx.body={success:true}
        ctx.set('Content-Type','application/json')
    })
    server.use(async (ctx,next)=>{
        // const path = ctx.path
        // const method = ctx.method
        
        // ctx.body='<span>koa render</span>'+path+method
        await next()
    })
    server.use(router.routes())

    // server.use(async (ctx,next)=>{
    //     ctx.body='<span>koa render2</span>'
    // })
    // server.use(async (ctx,next)=>{
    //     await handle(ctx.req,ctx.res)
    //     ctx.respond=false
    // })
    server.listen(8888,()=>{
        console.log('koa server listening 8888');
    })
// })