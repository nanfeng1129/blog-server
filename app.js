/**
 * @author Ryan
 * @description 项目的入口文件
 */
const Koa = require('koa');
const path = require('path');
console.log("查看path用法：", path.resolve('wwwroot', '/static_files/png/', '../gif/image.gif'))
const app = new Koa();

app.use(async (ctx) => {
    ctx.body = 'hello koa!'
})

app.listen(3000, () => {
    console.log('koa已监听3000端口！');
});

