/**
 * @author Ryan
 * @description 项目的入口文件
 */

const Koa = require('koa');
// const Router = require('koa-router');
const router = require('./router/index');
const path = require('path')
const KoaBody = require('koa-body');
const koaStatic = require('koa-static')
const app = new Koa();

//app.use(bodyParser());
app.use(KoaBody({
    multipart: true
}))

app.use(koaStatic(path.join(__dirname, './static')));
// router.post('/', async (ctx) => {
//     console.log("查看req中的post参数：", ctx.request.body);
//     //console.log("查看get请求的参数：", ctx.query.userName);
//     ctx.body = {
//         status: '0',
//         data: {
//             index: '1'
//         },
//         msg: 'success'
//     }
// })


// app.use(async (ctx) => {
//     ctx.body = 'hello koa!'
// })

//处理错误的中间件，放在最上层
const handler = async (ctx, next) => {
    try{
        await next();
    }catch {
        //ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            code: '1',
            data: {},
            message: '接口异常'
        }
    }
}

app.use(handler);

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log('koa已监听3000端口！');
});

