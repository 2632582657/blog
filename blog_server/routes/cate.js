var query = require('../pool.js');
getCate = (req, res) => {
    if (req.query.adm && !req.session.user) {
        res.status(401).json({
            code: 401,
            message: "登录过期"
        })
    } else {
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
}
// getLabel = (req,res)=>{
//     if(req.query.adm){
//         if(!req.session.user){
//             res.status(401).json({
//                 code: 401,
//                 message: "登录过期"
//             })
//         }
//     }
//     // let sql='select '
//     // query()
// }
module.exports = {
    getCate
}