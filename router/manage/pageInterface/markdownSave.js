const pool = require('../../../utils/util');
let markdown = require('koa-router')();

markdown.post('/', async (ctx) => {
    let { content, title, classification, tag } = ctx.request.body;
    let auth = ctx.headers.authorization;
    let token = auth.split(' ')[1];
    let querySql = 'SELECT * FROM users WHERE token = ?';
    let queryValue = token;
    let results = await pool.query(querySql, queryValue);
    if(results.length > 0){
        let { user_name } = results[0];
        let insertSql = 'INSERT INTO markdown SET ?';
        let insertValue = {
            user_name,
            content,
            title,
            create_time: pool.time,
            update_time: pool.time,
            tag,
            classification
        };
        await pool.insert(insertSql, insertValue);
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
