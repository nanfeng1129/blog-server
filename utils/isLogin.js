const pool = require('./util');

module.exports = {
    confirmIsLogin: async (ctx) => {
        let auth = ctx.headers.authorization;
        let token = auth.split(' ')[1];
        let querySql = 'SELECT * FROM users WHERE token = ?';
        let queryValue = token;
        let results = await pool.query(querySql, queryValue);
        if(results.length > 0){
            return true;
        }else{
            return false;
        }
    },
}