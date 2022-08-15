const pool = require('../../../utils/util')
let markdown = require('koa-router')();

markdown.post('/', async (ctx) => {
    let { title, pageNo, pageSize, create_time_start, create_time_end, update_time_start, update_time_end} = ctx.request.body;  //如果没有传title的话，title值为undefined
    let auth = ctx.headers.authorization;
    let token = auth.split(' ')[1];
    let querySql = 'SELECT * FROM users WHERE token = ?';
    let queryValue = token;
    let results = await pool.query(querySql, queryValue);
    if(results.length > 0){
        let queryTextSql, queryTotal, queryTextValue;
        queryTextSql = `SELECT classification, tag, mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
        queryTotal = 'SELECT COUNT(*) FROM markdown';
        queryTextValue = '';
        if(title){
            queryTextSql = `SELECT classification, tag, mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE title = ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
            queryTotal = 'SELECT COUNT(*) FROM markdown WHERE title = ?';
            queryTextValue = [title];
        }
        if(title && create_time_start){
            queryTextSql = `SELECT classification, tag, mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE title = ? and create_time >= ? and create_time <= ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
            queryTotal = 'SELECT COUNT(*) FROM markdown WHERE title = ? and create_time >= ? and create_time <= ?';
            queryTextValue = [title, create_time_start, create_time_end];
        }
        if(title && update_time_start){
            queryTextSql = `SELECT classification, tag, mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE title = ? and update_time >= ? and update_time <= ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
            queryTotal = 'SELECT COUNT(*) FROM markdown WHERE title = ? and update_time >= ? and update_time <= ?';
            queryTextValue = [title, update_time_start, update_time_end];
        }
        if(create_time_start){
            queryTextSql = `SELECT classification, tag, mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') >= ? and DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') <= ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
            queryTotal = 'SELECT COUNT(*) FROM markdown WHERE create_time >= ? and create_time <= ?';
            queryTextValue = [create_time_start, create_time_end];
        }
        if(update_time_start && create_time_start){
            queryTextSql = `SELECT classification, tag, mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE create_time >= ? and create_time <= ? and update_time >= ? and update_time <= ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
            queryTotal = 'SELECT COUNT(*) FROM markdown WHERE create_time >= ? and create_time <= ? and update_time >= ? and update_time <= ?';
            queryTextValue = [create_time_start, create_time_end, update_time_start, update_time_end];
        }
        if(update_time_start){
            queryTextSql = `SELECT classification, tag, mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE update_time >= ? and update_time <= ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
            queryTotal = 'SELECT COUNT(*) FROM markdown WHERE update_time >= ? and update_time <= ?';
            queryTextValue = [update_time_start, update_time_end];
        }
        if(update_time_start && create_time_start && title){
            queryTextSql = `SELECT classification, tag, mdId, title, content, DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') as create_time, DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') as update_time FROM markdown WHERE title = ? and create_time >= ? and create_time <= ? and update_time >= ? and update_time <= ? limit ${(pageNo - 1) * pageSize}, ${pageSize}`;
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
    }else{
        ctx.body = {
            code: '1',
            data: {},
            message: '查无此用户'
        }
    }
})

module.exports = markdown;
