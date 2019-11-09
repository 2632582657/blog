var query = require('../pool.js');
const env = require('../utils/env');
var util = require('../utils/util');
const path=require('path');
const fs = require('fs');

release = (req, res) => {
    // util.needLogin()
    var data = req.body;
    if (JSON.stringify(data) == "{}") {
        res.status(500).json({
            code: 500,
            message: "接收文章数据为空"
        })
    }
    let cover = `${env.host}images/${req.file.filename}`;
    let sql = "INSERT INTO sj_article (title, category_id, content,cover) VALUES (?,?,?,?)"
    var articleArr = [data.title, data.cate, data.content]
    if (cover) { articleArr.push(cover) }
    query(sql, articleArr, (err, result) => {
        if (err) { util.handleError(res, err) }
        if (result.affectedRows > 0) {
            res.json({
                code: 200,
                message: 'success',
                data: {
                    id: result.insertId
                }
            })
        }
    })
}
getArticleOfId=(req,res)=>{
    console.log(req.params.articleId)
    if(!req.params.articleId){
        res.status(403).json({
            code:403,
            message:"Failed to get article ID"
        })
        return;
    }
    let sql=`SELECT id,title,content,cover,category_id,date_format( create_time, '%Y-%m-%d %H:%i:%S' ) as create_time FROM sj_article WHERE id=?`;
    query(sql,req.params.articleId,(err,result)=>{
        if(err){
            util.handleError(res,err);
        }
        if(result.length>0){
            res.json({
                code:200,
                message:'success',
                data:result[0]
            })
        }else{
            res.status(500).json({
                code:500,
                message:"No results found"
            })
        }  
    })
}
getArticleOfCate = (req, res) => {
    console.log(req.query.search)
    if(req.query.adm){
        // util.needLogin(req,res)
    }
    let page = req.query.page ? req.query.page : 1;
    if (page < 1) {
        res.status(403).json({
            code: 403,
            message: "this page min is 1"
        })
        return;
    }
    if(req.query.search){
        if(!req.query.id&&!req.query.title){
            res.status(403).json({
                code:403,
                message:'查询关键字为空'
            })
            return;
        }
        let keyStr='';
        let arr=[];  
        if(req.query.id){
            keyStr+=`AND a.id=?`;
            arr.push(req.query.id)
        }
        if(req.query.title){
            keyStr+=`AND a.title Like ?`;
            arr.push(`%${req.query.title}%`)
        }
        keyStr=keyStr.slice(3)
        let searchCount=`SELECT COUNT(a.id) AS count FROM sj_article as a WHERE ${keyStr}`;
        let searchSql =
                `SELECT 
                a.id,
                a.title,
                date_format(a.create_time,'%Y-%m-%d %H:%i:%S' ) as create_time,
                a.hot,
                a.support,
                a.category_id
                ${!req.query.adm ? ",LEFT(a.content,50) AS content," : ','}
                COUNT(c.id) AS comment_count
            FROM 
                sj_article AS a 
            LEFT JOIN 
                sj_comment AS c ON a.id = c.article_id
            WHERE 
                ${keyStr}
            GROUP BY
                a.id
            ORDER BY 
                a.create_time
            LIMIT
                ?,10`;
        arr2.push((page - 1) * 10)
        query(searchCount,arr,(err,result)=>{
            if(err){util.handleError(res,err)}
            query(searchSql,[...arr,(page - 1) * 10],(dErr,dResult)=>{
                if(dErr){util.handleError(res,dErr)}
                res.json({
                    code:200,
                    message:'success',
                    data:{
                        articleInfo:dResult,
                        page:{
                            currentPage:parseInt(page),
                            pageCount:Math.ceil(result[0].count / 10)
                        }
                    }
                })
            })
        })
        return;
    }
    function getArticleOfPage(sql, params) {
        return new Promise(function (resolve, reject) {
            query(sql,params, (err, result) => {
                if (err){
                    util.handleError(res,err);
                    reject(err);
                }
                resolve(result);  
            });
        });
    }
    (async function(){
        let str='';
        let cateArr=[];
        if(req.query.adm){
            str+=req.query.cateId ? "category_id=?":"category_id IS  NULL ";
        }else{
            str+=req.query.cateId ? "category_id=?":"category_id IS NOT NULL " 
        }
        req.query.cateId ? cateArr.push(req.query.cateId) : false;
        let csql = `SELECT COUNT(id) AS count FROM sj_article WHERE ${str}`
        let sql =
            `SELECT 
            a.id,
            a.title,
            date_format(a.create_time,'%Y-%m-%d %H:%i:%S' ) as create_time,
            a.hot,
            a.support,
            a.category_id
            ${!req.query.adm ? ",LEFT(a.content,50) AS content," : ','}
            COUNT(c.id) AS comment_count
        FROM 
            sj_article AS a 
        LEFT JOIN 
            sj_comment AS c ON a.id = c.article_id
        WHERE 
            ${str}
        GROUP BY
            a.id
        ORDER BY 
            a.create_time
        LIMIT
            ?,10`;
        try {
            let resultCount=await getArticleOfPage(csql,cateArr);
            let result=await getArticleOfPage(sql,[...cateArr,(page-1)*10]);
            res.json({
                code:200,
                message:'success',
                data:{
                    articleInfo:result,
                    page:{
                        currentPage:parseInt(page),
                        pageCount:Math.ceil(resultCount[0].count / 10)
                    }
                }
            })
        } catch (err) {
            console.log(err);
        }    
    })();
    // function getArticleOfPage(sql, params) {
    //     return new Promise(function (resolve, reject) {
    //         query(sql,params, (err, result) => {
    //             if (err){
    //                 util.handleError(res,err)
    //             }
    //             resolve(result);
    //             reject(err);
    //         });
    //     });
    // }  
    // let csql = `SELECT COUNT(id) AS count FROM sj_article WHERE ${req.query.cateId ? "category_id=?":"category_id IS NULL"}`
    // let sql =
    //             `SELECT 
    //             a.id,
    //             a.title,
    //             date_format(a.create_time,'%Y-%m-%d %H:%i:%S' ) as create_time,
    //             a.hot,
    //             a.support,
    //             a.category_id
    //             ${!req.query.adm ? ",LEFT(a.content,50) AS content," : ','}
    //             COUNT(c.id) AS comment_count
    //         FROM 
    //             sj_article AS a 
    //         LEFT JOIN 
    //             sj_comment AS c ON a.id = c.article_id
    //         WHERE 
    //             ${req.query.cateId ? "category_id=?":"category_id IS NULL"}
    //         GROUP BY
    //             a.id
    //         ORDER BY 
    //             a.create_time
    //         LIMIT
    //             ?,10`;
    // let cateArr=[];
    // let pageArr=[(page - 1) * 10];
    // if(req.query.cateId){
    //     cateArr.push(req.query.cateId);
    //     pageArr.unshift(req.query.cateId)
    // }
    // Promise.all([getArticleOfPage(csql,cateArr), getArticleOfPage(sql,pageArr)])
    //     .then(result=>{
    //         console.log(2)
    //         res.json({
    //             code:200,
    //             message:"success",
    //             data:{
    //                 articleInfo:result[1],
    //                 page:{
    //                     currentPage:parseInt(page),
    //                     pageCount:Math.ceil(result[0][0].count / 10)
    //                 }
    //             }
    //         })
    //     }).catch(err=>{
    //         console.log(err);
    //     }) 
},
updateArticleOfId=(req,res)=>{
    // util.needLogin(req,res);
    if(!req.params.articleId){
        res.status(403).json({
            code:403,
            message:"Failed to get article ID"
        })
        return;
    }
    let str=""
    let paramsArr=[];
    for(let key in req.body){
        if(key!=='id'){
            str+=`${key}=?,`;
            paramsArr.push(req.body[key])
        }
    }
    function seleCover(sql,params){
        return new Promise(function(resolve,reject){
            query(sql,params,(err,result)=>{
                if(err){
                    util.handleError(res,err)
                }
                resolve(result)
            })
        })
    }
    if(str===""){
        //只更改的图片的情况
        if(req.file){
            let ssql='SELECT cover FROM sj_article WHERE id=?';
            let coverUrl=`${env.host}images/${req.file.filename}`;
            let sql='UPDATE sj_article SET cover=? WHERE id=?';
            Promise.all([seleCover(ssql,req.body.id),seleCover(sql,[coverUrl,req.body.id])])
            .then(result=>{
                var url = path.join(__dirname, `../public/images/${path.basename(result[0][0].cover)}`);
                fs.unlinkSync(url);
                res.json({
                    code:200,
                    message:'success'
                })
            })
        }
        //没做修改
        res.status(403).json({
            code:403,
            message:'没有更改'
        })
        return;
    }
    //改了内容和图片的情况
    if(req.file){
        let ssql='SELECT cover FROM sj_article WHERE id=?';
        let coverUrl=`${env.host}images/${req.file.filename}`;
        let sql='UPDATE sj_article SET cover=? WHERE id=?';
        Promise.all([seleCover(ssql,req.body.id),seleCover(sql,[coverUrl,req.body.id])])
        .then(result=>{
            var url = path.join(__dirname, `../public/images/${path.basename(result[0][0].cover)}`);
            fs.unlinkSync(url);
        })
    }
    str = str.slice(0, str.length - 1);
    paramsArr.push(req.body.id);
    let sql=`UPDATE sj_article SET ${str} WHERE id=?`;
    Promise.all([seleCover(sql,paramsArr)])
    .then(result=>{
        console.log(result[0].affectedRows)
        if(result[0].affectedRows>0){
            res.json({
                code:200,
                message:'success'
            })
        }else{
            res.status(500).json({
                code:500,
                message:'update is error'
            })
        }
    })

}
deleteArticleOfId=(req,res)=>{
    if(req.query.adm){
        // util.needLogin(req,res)
    }
    if(!req.query.articleId){
        res.status(403).json({
            code:403,
            message:'article id does not exist.'
        })
    }
    let sql="DELETE FROM sj_article WHERE id=?"
    query(sql,req.query.articleId,(err,result)=>{
        if(err){
            util.handleError(res,err)
        }
        if(result.affectedRows>0){
            res.json({
                code:200,
                message:'success'
            })
        }else{
            res.status(500).json({
                code:500,
                message:'delete error'
            })
        }
    })
}
module.exports = {
    release,
    getArticleOfId,
    getArticleOfCate,
    updateArticleOfId,
    deleteArticleOfId
}