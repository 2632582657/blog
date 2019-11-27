var query = require('../pool.js');
var util=require('../utils/util');

getCate = (req, res) => {
    if (req.query.adm) {
        util.needLogin(req,res);
        return;
    }
    let sql = "select id,name from sj_category";
    query(sql, (err, result) => {
        if (err) {
            res.status(500).json({
                code: 500,
                message: '数据库异常'
            })
        } else {
            res.json({
                code: 200,
                message: "分类",
                data: result
            })
        }

    })
}
module.exports = {
    getCate
}