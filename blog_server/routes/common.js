var query = require('../pool.js');
var util = require('../utils/util');
getAllCount=(req,res)=>{
    if(req.query.adm){
        util.needLogin(req,res);
    }
    sqlArticleCount=`SELECT COUNT(id) as count FROM sj_article WHERE category_id IS NOT NULL`;
    sqlAlbumCount=`SELECT COUNT(id) as count FROM sj_article WHERE category_id =10001`;
    sqlLeaveMsgCount=`SELECT COUNT(id) as count FROM sj_comment WHERE article_id=10001`;
    function getCount(sql,fn) {
        return new Promise(function (resolve, reject) {
            query(sql,(err, result) => {
                if (err) {
                    util.handleError(res, err);
                    reject(err);
                }
                fn(result);
                resolve();
            });
        });
    }
    (async function(){
        try {
            let data={};
            await getCount(sqlArticleCount,(result1)=>{
                data.articleCount=result1[0].count;
            })
            await getCount(sqlAlbumCount,(result2)=>{
                data.albumCount=result2[0].count;
            })
            await getCount(sqlLeaveMsgCount,(result3)=>{
                data.leaveMsgCount=result3[0].count;
            })
            res.json({
                code:200,
                message:'success',
                data:data
            })
        } catch (error) {
            
        }
    })()
}

module.exports = {
    getAllCount
}