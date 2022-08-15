/**
 * @description 接口返回的字段格式： data: {}, message: '', code: ''
 */


const router = require('koa-router')();
const portal = require('./portal/portal');
const manage = require('./manage/manage');
const upload = require('./upload/upload');

router.use('/portal', portal.routes(), portal.allowedMethods());
router.use('/manage', manage.routes(), manage.allowedMethods());
router.use('/upload', upload.routes(), upload.allowedMethods());
module.exports = router;