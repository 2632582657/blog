var query = require('../pool.js');
var util = require('../utils/util');
getComment = (req, res) => {
    console.log(req.query);
    if (req.query.adm) {
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
    if (req.query.search) {
        let keyStr = '';
        let arr = [];
        if (req.query.id) {
            keyStr += `AND c.id=?`;
            arr.push(req.query.id)
        }
        if (req.query.userId) {
            keyStr += `AND c.user_id=?`;
            arr.push(req.query.userId)
        }
        if (req.query.articleId) {
            keyStr += `AND c.article_id=?`;
            arr.push(req.query.articleId)
        }
        if (req.query.content) {
            keyStr += `AND c.content Like ?`;
            arr.push(`%${req.query.content}%`)
        }
        if (arr.length === 0) {
            res.status(403).json({
                code: 403,
                message: '查询关键字为空'
            })
            return;
        }
        let sqlCount = `SELECT COUNT(id) AS count FROM sj_comment AS c WHERE ${keyStr.slice(3)}`
        let sql =
            `SELECT c.id, c.user_id, u.name as user_name,c.article_id,a.title,c.status,c.content,date_format(c.create_time,'%Y-%m-%d %H:%i:%S' ) as create_time 
        FROM sj_comment AS c,sj_user AS u, sj_article AS a
        WHERE c.user_id=u.id AND c.article_id=a.id ${keyStr} ORDER BY c.create_time DESC  LIMIT ?,10`;
        query(sqlCount, arr, (errCount, resultCount) => {
            if (errCount) { util.handleError(res, errCount); return; }
            query(sql, [...arr, (page - 1) * 10], (err, result) => {
                if (err) { util.handleError(res, err); return; }
                res.json({
                    code: 200,
                    message: 'success',
                    data: {
                        commentList: result,
                        page: {
                            currentPage: parseInt(page),
                            pageCount: Math.ceil(resultCount[0].count / 10)
                        }
                    }
                })
            })
        })
    } else {
        if (req.query.articleId) {
            let sqlOfArticleId =
                `
                    SELECT
                        a1.*,a2.name AS reply_name 
                    FROM
                    (
                        SELECT 
                            c.id,
                            c.user_id,
                            u.name,
                            u.avatar,
                            c.status,
                            c.content,
                            c.parent_id,
                            c.reply_user_id,
                            date_format(c.create_time,'%Y-%m-%d %H:%i') AS create_time
                        FROM 
                            sj_comment AS c,
                            sj_user AS u
                        WHERE 
                            c.user_id=u.id
                            AND u.status=1
                            AND c.article_id=?
                    ) AS a1
                    LEFT JOIN sj_user AS a2 ON a1.reply_user_id=a2.id
                    ORDER BY
                        a1.create_time DESC`;
            query(sqlOfArticleId, req.query.articleId, (err, result) => {
                if (err) { util.handleError(res, err) }
                res.json({
                    code: 200,
                    message: "success",
                    data: result
                })
            })
        } else {
            let sqlCount = `SELECT COUNT(id) AS count FROM sj_comment`;
            let sql =
                `SELECT c.id, c.user_id, u.name as user_name,c.article_id,a.title,c.status,c.content,date_format(c.create_time,'%Y-%m-%d %H:%i:%S' ) as create_time 
                FROM sj_comment AS c,sj_user AS u, sj_article AS a
                WHERE c.user_id=u.id AND c.article_id=a.id ORDER BY c.create_time DESC  LIMIT ?,10`;
            query(sqlCount, (errCount, resultCount) => {
                if (errCount) { util.handleError(res, errCount); return; }
                query(sql, (page - 1) * 10, (err, result) => {
                    if (err) { util.handleError(res, err); return; }
                    res.json({
                        code: 200,
                        message: 'success',
                        data: {
                            commentList: result,
                            page: {
                                currentPage: parseInt(page),
                                pageCount: Math.ceil(resultCount[0].count / 10)
                            }
                        }
                    })
                })
            })

        }
    }
}
updateStatus = (req, res) => {
    // util.needLogin();
    if (typeof req.body.status !== 'undefined') {
        let sql = `UPDATE sj_comment SET  status=? WHERE id=?`;
        query(sql, [req.body.status, req.params.commentId], (err, result) => {
            if (err) { util.handleError(res, err); return; }
            res.json({
                code: 200,
                message: "success"
            })
        })
    }
}
deleteCommentOfId = (req, res) => {
    // util.needLogin();
    let sql = `DELETE FROM sj_comment WHERE id=?`;
    query(sql, req.params.commentId, (err, result) => {
        if (err) { util.handleError(res, err); return; }
        res.json({
            code: 200,
            message: 'success'
        })
    })
}
addComment = (req, res) => {
    console.log(req.body)
    let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
    if (!reg.test(req.body.email)) {
        res.status(403).json({
            code: 403,
            message: "邮箱格式不正确",
        })
        return;
    }
    function getUser(sql, params, fn) {
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
    let sqlEmail = `SELECT id, name, email, address, avatar, status FROM sj_user WHERE email=?`;
    (async function () {
        let userInfo;
        try {
            await getUser(sqlEmail, req.body.email, (result) => {
                userInfo = result
            });
            if (userInfo.length > 0) {
                if (req.body.userName === userInfo[0].name) {
                    if (!userInfo[0].status) {
                        res.json({
                            code: 200,
                            message: '当前用户已被站长拉入黑名单'
                        })
                        return;
                    }
                    if (userInfo[0].id === 10000 && req.body.content.slice(0, 1) !== '丶') {
                        res.json({
                            code: 200,
                            message: '请使用自己的邮箱和昵称',
                        })
                        return;
                    }

                    let sqlInsertCommentAsUser =
                        `INSERT INTO 
                            sj_comment 
                            (user_id,article_id,content ${req.body.parentId && req.body.replyUserId ? ',parent_id,reply_user_id' : ''}${userInfo[0].id === 10000 ? ',status' : ''} )
                        VALUES 
                            (?,?,? ${req.body.parentId && req.body.replyUserId ? ',?,?' : ''}${userInfo[0].id === 10000 ? ',?' : ''})`;
                    let commParamsArrAsUser = [userInfo[0].id, req.body.articleId, userInfo[0].id === 10000 ? req.body.content.slice(1) : req.body.content];
                    (req.body.parentId && req.body.replyUserId) && commParamsArrAsUser.push(...[req.body.parentId, req.body.replyUserId]);
                    userInfo[0].id === 10000 && commParamsArrAsUser.push(1);
                    await getUser(sqlInsertCommentAsUser, commParamsArrAsUser, (commResult) => {
                        res.json({
                            code: 200,
                            message: '评论发表成功，请等待站长审核。',
                            data: {
                                commentId: commResult.insertId
                            }
                        })
                    })
                }
            } else {
                let userParamsArr = [req.body.userName, req.body.email, Math.floor(Math.random() * 15) + 1];
                let sqlInsertUser = `INSERT INTO sj_user (name, email, avatar ${req.body.address ? ', address' : ''}) VALUES(?,?,? ${req.body.address ? ',?' : ''}) `;
                req.body.address && userParamsArr.push(req.body.address);
                let InsertUserId;
                await getUser(sqlInsertUser, userParamsArr, (InsertUserResult) => {
                    InsertUserId = InsertUserResult.insertId;
                });
                //发表评论
                let commentParamsArr = [InsertUserId, req.body.articleId, req.body.content];
                let sqlInsertComment =
                    `INSERT INTO sj_comment (user_id,article_id,content ${req.body.parentId && req.body.replyUserId ? ',parent_id,reply_user_id' : ''})
                                VALUES (?,?,? ${req.body.parentId && req.body.replyUserId ? ',?,?' : ''})`;
                (req.body.parentId && req.body.replyUserId) && commentParamsArr.push(...[req.body.parentId, req.body.replyUserId]);
                await getUser(sqlInsertComment, commentParamsArr, (commentResult) => {
                    res.json({
                        code: 200,
                        message: '初次发表评论成功，请等待站长审核。您的用户名已被识别，以后发表评论请使用此次识别的用户名，请牢记。',
                        data: {
                            commentId: commentResult.insertId
                        }
                    })
                })
            }
        } catch (err) {
            console.log(err)
        }
    })()
    /**
     * 要接收的值 昵称 邮箱 内容 网址(选填) 文章id 回复人id(选) 父级id(选)
     * 如果用户要发评论 分以下几种情况，
     * 1.用户是否存在，如何：根据邮箱去查 如果有 表示存在 没有 则不存在 
     *      存在
     *          判断 1.根据用户名去判断 
     *                  相同 ：1.判断是否为站长，
     *                              不是站长：提示
     *                         2.判断是否禁用
     *                              禁用状态 提示
     *                              3.都满足 
     *                                  发表评论 
     *                                      sql语句 中根据站长判断 是战长 添加状态为1 否则不加状态字段
     *                          
     *                  不同 ：返回 提示
     *                     
     *      不存在
     *          注册一个账户 成功后返回id 
     *              发表评论
     */
}
module.exports = {
    getComment,
    updateStatus,
    deleteCommentOfId,
    addComment
}