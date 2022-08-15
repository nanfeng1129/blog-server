const login = require('./pageInterface/login');
const markdownSave = require('./pageInterface/markdownSave');
const markdownQuery = require('./pageInterface/markdownQuery');
const markdownDel = require('./pageInterface/markdownDel');
const markdownModify = require('./pageInterface/markdownModify');
let manage = require('koa-router')();


manage.use('/login', login.routes(), login.allowedMethods())
manage.use('/save', markdownSave.routes(), markdownSave.allowedMethods())
manage.use('/textQuery', markdownQuery.routes(), markdownQuery.allowedMethods())
manage.use('/delete', markdownDel.routes(), markdownDel.allowedMethods())
manage.use('/modify', markdownModify.routes(), markdownModify.allowedMethods())
module.exports = manage;