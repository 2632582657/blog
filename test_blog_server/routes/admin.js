var md5 = require('md5');
var query = require('../pool.js');

adminLogin = (req, res) => {
    if (!req.body.userName && !req.body.passWord) {
        res.status(403).json({
            code: 403,
            message: "用户名或密码为空"
        })
    } else {
        var sql = "select id,name from sj_admin where name=? and pwd=?"
        query(sql, [req.body.userName, md5(md5(req.body.passWord))], (err, result) => {
            if (err) {
                throw err;
            }
            if (result.length === 0) {
                res.json({
                    code: 403,
                    message: "用户名或密码错误"
                })
            } else {
                req.session.user = {
                    id: result[0].id,
                    name: result[0].username
                }
                res.json({
                    code:200,
                    message:"success",
                    data:result[0]
                })
            }
        })
    }

}


module.exports = {
    adminLogin
}