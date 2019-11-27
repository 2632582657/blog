var query = require('../pool.js');
var util = require('../utils/util');

getFlink = (req, res) => {
    if(req.query.adm){util.needLogin(req,res)}
    let page = req.query.page ? req.query.page : 1;
    if (page < 1) {
        res.status(403).json({
            code: 403,
            message: "this page min is 1"
        })
        return;
    }
    function getLink(sql, params, fn) {
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
            if (req.query.search) {
                if (!req.query.id && !req.query.userName) {
                    res.status(403).json({
                        code: 403,
                        message: '查询关键字为空'
                    })
                    return;
                }
                let keyStr = '';
                let arr = [];
                if (req.query.id) {
                    keyStr += `AND id=?`;
                    arr.push(req.query.id)
                }
                if (req.query.userName) {
                    keyStr += `AND name Like ?`;
                    arr.push(`%${req.query.userName}%`)
                }
                keyStr = keyStr.slice(3)
                let searchCount = `SELECT COUNT(id) AS count FROM sj_f_link  WHERE ${keyStr}`;
                let sqlSearch =
                    `SELECT 
                            id,
                            name,
                            avatar,
                            avatar_link,
                            address,
                            info,
                            date_format(create_time,'%Y-%m-%d %H:%i:%S' ) as create_time,
                            status
                        FROM 
                            sj_f_link
                        WHERE
                            ${keyStr}
                        ORDER BY
                            create_time DESC
                        LIMIT ?,10
                        `
                let pageObj;
                await getLink(searchCount, arr, (resultCount) => {
                    pageObj = resultCount
                })
                await getLink(sqlSearch, [...arr, (page - 1) * 10], (result) => {
                    res.json({
                        code: 200,
                        message: 'success',
                        data: {
                            flinkList: result,
                            page: {
                                currentPage: parseInt(page),
                                pageCount: Math.ceil(pageObj[0].count / 10)
                            }
                        }
                    })
                })
            } else {
                let sqlCount = `SELECT COUNT(id) as count FROM sj_f_link`
                let sql =
                    `SELECT 
                    id,
                    name,
                    avatar,
                    avatar_link,
                    address,
                    info,
                    date_format(create_time,'%Y-%m-%d %H:%i:%S' ) as create_time,
                    status
                FROM 
                    sj_f_link
                ORDER BY
                    create_time DESC
                ${req.query.adm ? 'LIMIT ?,10' : ''}
                `
                let pageObj;
                await getLink(sqlCount, [], (resultCount) => {
                    pageObj = resultCount
                })
                if (req.query.adm) {
                    await getLink(sql, (page - 1) * 10, (result) => {
                        res.json({
                            code: 200,
                            message: 'success',
                            data: {
                                flinkList: result,
                                page: {
                                    currentPage: parseInt(page),
                                    pageCount: Math.ceil(pageObj[0].count / 10)
                                }
                            }
                        })
                    })
                } else {
                    await getLink(sql, [], (result) => {
                        res.json({
                            code: 200,
                            message: 'success',
                            data: result
                        })
                    })
                }

            }

        } catch (error) {
            console.log(error)
        }
    })();
}
getFlinkOfId = (req, res) => {
    if (req.query.adm) { util.needLogin(req, res) }
    if (!req.params.flinkId) {
        res.status(403).json({
            code: 403,
            message: "No flinkId received"
        })
        return;
    }
    let sql = `SELECT id, name, avatar, avatar_link, address, info, date_format(create_time,'%Y-%m-%d %H:%i:%S' ) as create_time, status FROM sj_f_link WHERE id=?`;
    query(sql, req.params.flinkId, (err, result) => {
        if (err) { util.handleError(res, err) }
        res.json({
            code: 200,
            message: "success",
            data: result[0]
        })
    })
} 
updateFlinkOfId=(req,res)=>{
    util.needLogin(req, res);
    let str='';
    let paramsArr=[]
    for(let key in req.body){
        str+=`${key}=?,`;
        paramsArr.push(req.body[key])
    };
    str = str.slice(0, str.length - 1);
    let sql= `UPDATE sj_f_link SET ${str} WHERE id=?`;
    paramsArr.push(req.params.flinkId);
    query(sql,paramsArr,(err,result)=>{
        if(err){util.handleError(res,err)}
        if(result.affectedRows>0){
            res.json({
                code:200,
                message:'success'
            })
        }
    })
}
updateStatusOfId=(req,res)=>{
    util.needLogin(req, res);
    if (typeof req.body.status !== 'undefined') {
        let sql = `UPDATE sj_f_link SET  status=? WHERE id=?`;
        query(sql,[req.body.status,req.params.flinkId],(err,result)=>{
            if(err){util.handleError(res,err)};
            if(result.affectedRows>0){
                res.json({
                    code:200,
                    message:'success'
                })
            }
        })

    }
}
addFlink=(req,res)=>{
    util.needLogin(req, res);
    if(JSON.stringify(req.body)==='{}'){
        res.status(403).json({
            code:200,
            message:'No parameters'
        })
        return;
    }
    let paramsArr=[req.body.name,req.body.avatar,req.body.address];
    req.body.avatar_link && paramsArr.push(req.body.avatar_link);
    req.body.info && paramsArr.push(req.body.info);
    let sql=`INSERT INTO sj_f_link (name,avatar,address ${req.body.avatar_link ? ',avatar_link':''}${req.body.info ? ',info':''}) VALUES (
        ?,?,?${req.body.avatar_link? ',?':''}${req.body.info? ',?':''}
    )`;
    query(sql,paramsArr,(err,result)=>{
        if(err){util.handleError(res,err)}
        let date=new Date().Format("yyyy-MM-dd hh:mm:ss");
        if(result.affectedRows>0){
            res.json({
                code:200,
                message:'success',
                data:{
                    id:result.insertId,
                    create_time:date
                }
            })
        }
    })
    
}
module.exports = {
    getFlink,
    getFlinkOfId,
    updateFlinkOfId,
    updateStatusOfId,
    addFlink
}