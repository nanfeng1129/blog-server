/**
 * @author Ryan
 * @description 项目的入口文件
 */
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx) => {
    ctx.body = 'hello koa!'
})

app.listen(3000, () => {
    console.log('koa已监听3000端口！');
});

