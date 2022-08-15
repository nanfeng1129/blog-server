const mysql2 = require('mysql2');
const config = require('../config/config')
let pool = mysql2.createPool({
    connectionLimit: config.connectionLimit,
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})

function fillZero(num){
    let str;
    if(num < 10){
        str = '0' + num;
    }else{
        str = '' + num;
    }
    return str;
}

let date = new Date();
let year = date.getFullYear() + '';
let month = date.getMonth() + 1;
let day = date.getDate();
let hour = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();
let time = year + '-' + fillZero(month) + '-' + fillZero(day) + ' ' + fillZero(hour) + ':' + fillZero(min) + ':' + fillZero(sec);

//module.exports = pool;

module.exports = {
    query: (sql, value) => {
        return new Promise((resolve, reject) => {
            if(value){
                pool.query(sql, value, (err, results) => {
                    if(err) throw(err);
                    else {
                        resolve(results);
                        //console.log("查看返回的结果是什么：", results);
                    }
                })
            }else{
                pool.query(sql, (err, results) => {
                    if(err) throw(err);
                    else {
                        resolve(results);
                        //console.log("查看返回的结果是什么：", results);
                    }
                })
            }
        })
    },
    insert: (sql, value) => {
        return new Promise((resolve, reject) => {
            pool.query(sql, value, (err, results) => {
                if(err) reject(err);
                else{
                    resolve(results);
                    //console.log("查看返回的结果是什么：", results);
                }
            })
        })
    },
    update: (sql, value) => {
        return new Promise((resolve, reject) => {
            pool.query(sql, value, (err, results) => {
                if(err) reject(err);
                else{
                    resolve(results);
                    //console.log("查看返回的结果是什么：", results);
                }
            })
        })
    },
    delete: (sql, value) => {
        return new Promise((resolve, reject) => {
            pool.query(sql, value, (err, results) => {
                if(err) reject(err);
                else{
                    resolve(results);
                }
            })
        })
    },
    time,
};