var express = require('express');
var router = express.Router();
var admin=require('./admin')

router.get('/',(req, res)=>{
  res.json({
    code:10000,
    message:"测试接口连接成功..."
  })
});
router.post('/adminLogin',(req,res)=>{
  admin.adminLogin(req,res)
})

module.exports = router;
