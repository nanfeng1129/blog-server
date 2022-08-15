let query = require('koa-router')();
const pool = require('../../../utils/util')
query.post('/', async (ctx) => {
    let queryTagSql = 'SELECT classification, COUNT(*) FROM markdown GROUP BY classification';
    let queryTextValue = '';
    let results = await pool.query(queryTagSql, queryTextValue);
    //console.log("查看请求的结果：", results);
    ctx.body = {
        code: '0',
        data: {
            total: results.length,
            dataList: results
        },
        message: 'success'
    }
})

module.exports = query;