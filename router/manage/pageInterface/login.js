const pool = require('../../../utils/util')
let login = require('koa-router')();
const md5 = require('md5');

login.post('/', async (ctx) => {
    let { userName, password } = ctx.request.body;
    //console.log("查看请求的参数：", userName, password)
    //let sql = `SELECT * from users WHERE user_name = '${userName}' and password = '${password}'`;
    let sql = 'SELECT * FROM users WHERE user_name = ? and password = ?';
    let queryValue = [userName, password];
    let results = await pool.query(sql, queryValue);
    if(results.length > 0){
        let random = parseInt(Math.random() * 100);
        let token = md5(`${userName}${random}`);
        let updateSql = 'UPDATE users SET token = ? WHERE user_name = ?';
        let updateValue = [token, userName];
        await pool.update(updateSql, updateValue);
        ctx.body = {
            code: '0',
            data: {
                token: token,
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

module.exports = login;