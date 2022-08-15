let query = require('koa-router')();
const pool = require('../../../utils/util')
query.post('/', async (ctx) => {
    let { title, pageNo, pageSize, create_time_start, create_time_end, update_time_start, update_time_end} = ctx.request.body;  //如果没有传title的话，title值为undefined
    let queryTextSql, queryTotal, queryTextValue;
    queryTextSql = `SELECT mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
    queryTotal = 'SELECT COUNT(*) FROM markdown';
    queryTextValue = '';
    if(title){
        queryTextSql = `SELECT mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE title = ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
        queryTotal = 'SELECT COUNT(*) FROM markdown WHERE title = ?';
        queryTextValue = [title];
    }
    if(title && create_time_start){
        queryTextSql = `SELECT mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE title = ? and create_time >= ? and create_time <= ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
        queryTotal = 'SELECT COUNT(*) FROM markdown WHERE title = ? and create_time >= ? and create_time <= ?';
        queryTextValue = [title, create_time_start, create_time_end];
    }
    if(title && update_time_start){
        queryTextSql = `SELECT mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE title = ? and update_time >= ? and update_time <= ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
        queryTotal = 'SELECT COUNT(*) FROM markdown WHERE title = ? and update_time >= ? and update_time <= ?';
        queryTextValue = [title, update_time_start, update_time_end];
    }
    if(create_time_start){
        queryTextSql = `SELECT mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') >= ? and DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') <= ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
        queryTotal = 'SELECT COUNT(*) FROM markdown WHERE create_time >= ? and create_time <= ?';
        queryTextValue = [create_time_start, create_time_end];
    }
    if(update_time_start && create_time_start){
        queryTextSql = `SELECT mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE create_time >= ? and create_time <= ? and update_time >= ? and update_time <= ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
        queryTotal = 'SELECT COUNT(*) FROM markdown WHERE create_time >= ? and create_time <= ? and update_time >= ? and update_time <= ?';
        queryTextValue = [create_time_start, create_time_end, update_time_start, update_time_end];
    }
    if(update_time_start){
        queryTextSql = `SELECT mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE update_time >= ? and update_time <= ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
        queryTotal = 'SELECT COUNT(*) FROM markdown WHERE update_time >= ? and update_time <= ?';
        queryTextValue = [update_time_start, update_time_end];
    }
    if(update_time_start && create_time_start && title){
        queryTextSql = `SELECT mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE title = ? and create_time >= ? and create_time <= ? and update_time >= ? and update_time <= ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
        queryTotal = 'SELECT COUNT(*) FROM markdown WHERE title = ? and create_time >= ? and create_time <= ? and update_time >= ? and update_time <= ?';
        queryTextValue = [title, create_time_start, create_time_end, update_time_start, update_time_end];
    }
    //let queryTextValue = title ? title : '';
    let results2 = await pool.query(queryTextSql, queryTextValue);
    let total = await pool.query(queryTotal, queryTextValue);
    ctx.body = {
        code: '0',
        data: {
            dataList: results2,
            total: total[0]['COUNT(*)']
        },
        message: 'success'
    }
})

module.exports = query;