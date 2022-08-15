let query = require('koa-router')();
const pool = require('../../../utils/util')
query.post('/', async (ctx) => {
    let { classification, pageNo, pageSize } = ctx.request.body;
    let queryTagSql = `SELECT classification, tag, mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE classification = ? ORDER BY update_time DESC limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
    let queryTextValue = classification;
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