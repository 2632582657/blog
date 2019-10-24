var md5 = require('md5');
var query = require('../pool.js');

adminLogin=(req,res)=>{
    console.log(md5(md5(req.body.passWord)))
    var sql="select id,name from sj_admin where name=? and pwd=?"
    query(sql,[req.body.userName,md5(md5(req.body.passWord))],(err,result)=>{
        if(err){
            throw err;
        }
        res.json({
            code:200,
            data:result[0]
        })
    })
}

module.exports = {
    adminLogin
}