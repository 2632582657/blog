var query = require('../pool.js');
const env = require('../utils/env');
var util = require('../utils/util');
const path = require('path');
const fs = require('fs');

release = (req, res) => {
    util.needLogin(req, res);
    var data = req.body;
    if (JSON.stringify(data) == "{}") {
        res.status(500).json({
            code: 500,
            message: "接收文章数据为空"
        })
    }
    let cover = `${env.host}images/${req.file.filename}`;
    let sql = `INSERT INTO sj_article (title, category_id, content,cover) VALUES (?,?,?,?)`;
    let articleArr = [req.body.title, req.body.cate, req.body.content];
    if (cover) { articleArr.push(cover); }
    query(sql, articleArr, (err, result) => {
        if (err) { util.handleError(res, err); }
        if (result && result.affectedRows > 0) {
            res.json({
                code: 200,
                message: 'success',
                data: {
                    id: result.insertId
                }
            })
        } else {
            res.status(500).json({
                code: 500,
                message: "未知原因发布文章失败"
            })
        }
    })
}
getArticleOfId = (req, res) => {
    if (req.query.adm) {
        util.needLogin(req, res);
    }
    if (!req.params.articleId) {
        res.status(403).json({
            code: 403,
            message: "Failed to get article ID"
        })
        return;
    }
    function getArticle(sql, params, fn) {
        return new Promise(function (resolve, reject) {
            query(sql, params, (err, result) => {
                if (err) {
                    util.handleError(res, err);
                    reject(err);
                }
                fn(result);
                resolve();
            });
        });
    }
    (async function () {
        try {
            let sql =
                `SELECT 
                a.id,
                a.title,
                a.content,
                a.cover,
                a.category_id,
                date_format( a.create_time, '%Y-%m-%d %H:%i:%S' ) as create_time,
                a.hot,
                a.support,
                cate.name AS category_name
            FROM 
                sj_article AS a
            LEFT JOIN sj_category AS cate ON a.category_id = cate.id 
            WHERE a.id=?`;
            let sqlHot = `UPDATE sj_article SET hot=? WHERE id=?`;
            let articleInfo;
            await getArticle(sql, req.params.articleId, (result) => {
                articleInfo = result
            })
            await getArticle(sqlHot, [articleInfo[0].hot + 1, req.params.articleId], (resultHot) => {
                if (articleInfo.length > 0) {
                    res.json({
                        code: 200,
                        message: 'success',
                        data: articleInfo[0]
                    })
                } else {
                    res.status(500).json({
                        code: 500,
                        message: "No results found"
                    })
                }
            })

        } catch (error) {
            console.log(error)
        }
    })();
}
getArticleOfCate = (req, res) => {
    if (req.query.adm) {
        util.needLogin(req, res);
    }
    let page = req.query.page ? req.query.page : 1;
    if (page < 1) {
        res.status(403).json({
            code: 403,
            message: "this page min is 1"
        })
        return;
    }
    if (req.query.search) {
        if (!req.query.id && !req.query.title) {
            res.status(403).json({
                code: 403,
                message: '查询关键字为空'
            })
            return;
        }
        let keyStr = '';
        let arr = [];
        if (req.query.id) {
            keyStr += `AND a.id=?`;
            arr.push(req.query.id)
        }
        if (req.query.title) {
            keyStr += `AND a.title Like ?`;
            arr.push(`%${req.query.title}%`)
        }
        keyStr = keyStr.slice(3)
        let searchCount = `SELECT COUNT(a.id) AS count FROM sj_article as a WHERE ${keyStr}`;
        let searchSql =
            `SELECT 
                a.id,
                a.title,
                date_format(a.create_time,'%Y-%m-%d %H:%i:%S' ) as create_time,
                a.hot,
                a.support,
                a.category_id,
                cate.name as category_name,
                ${!req.query.adm ? "a.cover," : ''}
                ${!req.query.adm ? "LEFT(a.content,120) AS content," : ''}
                COUNT(c.id) AS comment_count
            FROM 
                sj_article AS a 
            LEFT JOIN sj_comment AS c ON a.id = c.article_id
            LEFT JOIN sj_category AS cate ON a.category_id = cate.id 
            WHERE 
                ${keyStr}
            GROUP BY
                a.id
            ORDER BY 
                a.create_time DESC
            LIMIT
                ?,10`;
        query(searchCount, arr, (err, result) => {
            if (err) { util.handleError(res, err) }
            query(searchSql, [...arr, (page - 1) * 10], (dErr, dResult) => {
                if (dErr) { util.handleError(res, dErr) }
                res.json({
                    code: 200,
                    message: 'success',
                    data: {
                        articleInfo: dResult,
                        page: {
                            currentPage: parseInt(page),
                            pageCount: Math.ceil(result[0].count / 10)
                        }
                    }
                })
            })
        })
        return;
    }
    function getArticleOfPage(sql, params) {
        return new Promise(function (resolve, reject) {
            query(sql, params, (err, result) => {
                if (err) {
                    util.handleError(res, err);
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    (async function () {
        let str = '';
        let cateArr = [];
        if (req.query.adm) {
            str += req.query.cateId ? "category_id=?" : "category_id IS  NULL ";
        } else {
            str += req.query.cateId ? "category_id=?" : "category_id IS NOT NULL "
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
            a.category_id,
            a.cover,
            cate.name as category_name
            ${!req.query.adm ? ",LEFT(a.content,120) AS content," : ','}
            COUNT(c.id) AS comment_count
        FROM 
            sj_article AS a 
        LEFT JOIN sj_comment AS c ON a.id = c.article_id
        LEFT JOIN sj_category AS cate ON a.category_id = cate.id 
        WHERE 
            ${str}
        GROUP BY
            a.id
        ORDER BY 
            a.create_time DESC
        LIMIT
            ?,10`;
        try {
            let resultCount = await getArticleOfPage(csql, cateArr);
            let result = await getArticleOfPage(sql, [...cateArr, (page - 1) * 10]);

            res.json({
                code: 200,
                message: 'success',
                data: {
                    articleInfo: result,
                    page: {
                        currentPage: parseInt(page),
                        pageCount: Math.ceil(resultCount[0].count / 10)
                    }
                }
            })
        } catch (err) {
            console.log(err);
        }
    })();
},
    // todo 改promise的格式
    updateArticleOfId = (req, res) => {
        util.needLogin(req, res);
        if (!req.params.articleId) {
            res.status(403).json({
                code: 403,
                message: "Failed to get article ID"
            })
            return;
        }
        let str = ""
        let paramsArr = [];
        for (let key in req.body) {
            if (key !== 'id') {
                str += `${key}=?,`;
                paramsArr.push(req.body[key])
            }
        }
        function seleCover(sql, params, callback) {
            return new Promise(function (resolve, reject) {
                query(sql, params, (err, result) => {
                    if (err) {
                        util.handleError(res, err)
                    }
                    callback(result);
                    resolve();
                })
            })
        }
        (async function () {
            try {
                if (str === "") {
                    //只更改的图片的情况
                    if (req.file) {
                        let ssql = 'SELECT cover FROM sj_article WHERE id=?';
                        let coverUrl = `${env.host}images/${req.file.filename}`;
                        let sql = 'UPDATE sj_article SET cover=? WHERE id=?';
                        let url = "";
                        await seleCover(ssql, req.body.id, (coverResult) => {
                            url = path.join(__dirname, `../public/images/${path.basename(coverResult[0].cover)}`);
                        })
                        await seleCover(sql, [coverUrl, req.body.id], (updateResult) => {
                            fs.unlinkSync(url);
                            res.json({
                                code: 200,
                                message: 'success'
                            })
                        })
                    } else {
                        //没做修改
                        res.status(403).json({
                            code: 403,
                            message: '没有更改'
                        })
                    }
                }else{
                    //改了内容和图片的情况
                    if (req.file) {
                        let ssql = 'SELECT cover FROM sj_article WHERE id=?';
                        let coverUrl = `${env.host}images/${req.file.filename}`;
                        let sql = 'UPDATE sj_article SET cover=? WHERE id=?';
                        let url = "";
                        await seleCover(ssql, req.body.id, (coverResult) => {
                            url = path.join(__dirname, `../public/images/${path.basename(coverResult[0].cover)}`);
                        })
                        await seleCover(sql, [coverUrl, req.body.id], (updateResult) => {
                            fs.unlinkSync(url);
                        })
                    }
                    str = str.slice(0, str.length - 1);
                    paramsArr.push(req.body.id);
                    let sql = `UPDATE sj_article SET ${str} WHERE id=?`;
                    await seleCover(sql, paramsArr, (strResult) => {
                        console.log(strResult)
                        if (strResult.affectedRows > 0) {
                            res.json({
                                code: 200,
                                message: 'success'
                            })
                        } else {
                            res.status(500).json({
                                code: 500,
                                message: 'update is error'
                            })
                        }
                    })
                }
                
            } catch (error) {
                console.log(error)
            }
        })();





    }
deleteArticleOfId = (req, res) => {
    1
    if (req.query.adm) {
        util.needLogin(req, res);
    }
    if (req.params.articleId === 10001 || req.params.articleId === 10002) {
        res.status(403).json({
            code: 403,
            message: '此类文章不可删除'
        })
    }
    function deleteArticle(sql, params, callback) {
        return new Promise(function (resolve, reject) {
            query(sql, params, (err, result) => {
                if (err) {
                    util.handleError(res, err)
                }
                callback(result)
                resolve()
            })
        })
    }
    let sqlCover = `SELECT category_id, cover FROM sj_article WHERE id=? `;
    let sql = "DELETE FROM sj_article WHERE id=?";
    (async function () {
        try {
            await deleteArticle(sqlCover, req.params.articleId, (coverResult) => {
                if (coverResult.length === 0) {
                    res.json({
                        code: 500,
                        message: '查询不到删除的内容'
                    })
                    return;
                } else {
                    let url = path.join(__dirname, `../public/images/${path.basename(coverResult[0].cover)}`);
                    deleteArticle(sql, req.params.articleId, (deleteResult) => {
                        if (deleteResult.affectedRows > 0) {
                            res.json({
                                code: 200,
                                message: 'success'
                            })
                            fs.unlinkSync(url);
                        } else {
                            res.status(500).json({
                                code: 500,
                                message: 'delete error'
                            })
                        }
                    })
                }
            })

        } catch (error) {
            if (error) {
                console.log(error)
            }
        }
    })()
}
hot = (req, res) => {
    let sql = `SELECT id, title, category_id, cover FROM sj_article WHERE category_id IS NOT NULL ORDER BY hot DESC LIMIT 5`;
    query(sql, (err, result) => {
        if (err) { util.handleError(res, err) }
        res.json({
            code: 200,
            message: 'success',
            data: result
        })
    })
}
zan = (req, res) => {
    if (!req.params.articleId) {
        res.status(403).json({
            code: 403,
            message: "Failed to get article ID"
        })
        return;
    }
    let sql = `UPDATE sj_article SET support=? WHERE id=?`;
    query(sql, [parseInt(req.query.support) + 1, req.params.articleId], (err, result) => {
        if (err) { util.handleError(res, err) }
        if (result.affectedRows > 0) {
            res.json({
                code: 200,
                message: 'success'
            })
        } else {
            res.json({
                code: 403,
                message: '系统错误 点赞失败'
            })
        }
    })
}
module.exports = {
    release,
    getArticleOfId,
    getArticleOfCate,
    updateArticleOfId,
    deleteArticleOfId,
    hot,
    zan
}