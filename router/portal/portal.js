let portal = require('koa-router')();
const query = require('./pageInterface/query');
const tagAll = require('./pageInterface/tagQuery');
const classAll = require('./pageInterface/classQuery');
const tagStamp = require('./pageInterface/tagStamp');
const classStamp = require('./pageInterface/classStamp')
portal.use('/query', query.routes(), query.allowedMethods());
portal.use('/tagAll', tagAll.routes(), tagAll.allowedMethods());
portal.use('/classAll', classAll.routes(), classAll.allowedMethods());
portal.use('/tagStamp', tagStamp.routes(), tagStamp.allowedMethods());
portal.use('/classStamp', classStamp.routes(), classStamp.allowedMethods());

module.exports = portal;