const path = require('path');
const fse = require('fs-extra')
//const send = require('koa-send');
const judge = require('../../utils/isLogin');
let upload = require('koa-router')();

upload.post('/', async (ctx) => {
    let { name, path: filePath } = ctx.request.files.file;
    let isLogin = judge.confirmIsLogin(ctx);
    if(isLogin){
        const dest = path.join(__dirname, '../../static', name);
        //用fs模块会出现权限不被允许的错误，因此改用fs-extra插件实现
        await fse.move(filePath, dest);
        //console.log("查看后端接收的情况：", ctx.request.files.file);
        ctx.body = {
            code: '0',
            data: {
                url: name,
                name: name
            },
            message: 'success'
        }
    }else{
        ctx.body = {
            code: '1',
            data: {},
            message: '用户不存在'
        }
    }
    
})

module.exports = upload;
