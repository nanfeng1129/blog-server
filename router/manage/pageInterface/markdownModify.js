const pool = require('../../../utils/util');
const judge = require('../../../utils/isLogin');
let markdown = require('koa-router')();

markdown.post('/', async (ctx) => {
    let { content, title, mdId, classification, tag } = ctx.request.body;
    let isLogin = judge.confirmIsLogin(ctx);
    if(isLogin){
        let modifySql = 'UPDATE markdown SET title = ?, classification = ?, tag = ?, content = ?, update_time = ? WHERE mdId = ?';
        let modifyValue = [title, classification, tag, content, pool.time, mdId];
        await pool.update(modifySql, modifyValue);
        ctx.body = {
            code: '0',
            data: {},
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

module.exports = markdown;
