const pool = require('../../../utils/util');
const judge = require('../../../utils/isLogin');
let del = require('koa-router')();


del.post('/', async (ctx) => {
    let { mdId } = ctx.request.body;
    let isLogin = judge.confirmIsLogin(ctx);
    if(isLogin){
        let delSql = 'DELETE FROM markdown WHERE mdId = ?'
        let delValue = mdId;
        await pool.delete(delSql, delValue);
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

module.exports = del;
