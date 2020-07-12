var query = require('../pool.js');
var util = require('../utils/util');
getUser = (req, res) => {
  if (req.query.adm) {
    util.needLogin(req,res);
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
      keyStr += `AND id=?`;
      arr.push(req.query.id)
    }
    if (req.query.name) {
      keyStr += `AND name Like ?`;
      arr.push(`%${req.query.name}%`)
    }
    if (req.query.email) {
      keyStr += `AND email Like ?`;
      arr.push(`%${req.query.email}%`)
    }
    if (arr.length===0) {
      res.status(403).json({
        code: 403,
        message: '查询关键字为空'
      })
      return;
    }
    keyStr = keyStr.slice(3);
    let sqlCount = `SELECT COUNT(id) AS count FROM sj_user WHERE ${keyStr}`
    let sql = `SELECT id, name, email, avatar, date_format(create_time,'%Y-%m-%d %H:%i:%S' ) as create_time, status FROM sj_user WHERE ${keyStr}  GROUP BY id ORDER BY create_time DESC LIMIT ?,10`;
    query(sqlCount, arr, (err, result) => {
      if (err) { util.handleError(res, err) }
      query(sql, [...arr, (page - 1) * 10], (rErr, rResult) => {
        if (rErr) { util.handleError(res, rErr) }
        res.json({
          code: 200,
          message: 'success',
          data: {
            userList: rResult,
            page: {
              currentPage: parseInt(page),
              pageCount: Math.ceil(result[0].count / 10)
            }
          }
        })
      })
    })
  } else {
    let sqlCount = `SELECT COUNT(id) AS count FROM sj_user`
    let sql = `SELECT id, name, email, avatar, date_format(create_time,'%Y-%m-%d %H:%i:%S' ) as create_time, status FROM sj_user  GROUP BY id ORDER BY create_time DESC  LIMIT ?,10`;
    query(sqlCount, (err, result) => {
      if (err) { util.handleError(res, err) }
      query(sql, (page - 1) * 10, (rErr, rResult) => {
        if (rErr) { util.handleError(res, rErr) }
        res.json({
          code: 200,
          message: 'success',
          data: {
            userList: rResult,
            page: {
              currentPage: parseInt(page),
              pageCount: Math.ceil(result[0].count / 10)
            }
          }
        })
      })
    })
  }

}
getUserOfId=(req,res)=>{
  if(req.query.adm){util.needLogin(req,res);}
  if(!req.params.userId){
    res.status(403).json({
      code:403,
      message:"No user ID received"
    })
    return;
  }
  let sql=`SELECT id, name, email, avatar, date_format(create_time,'%Y-%m-%d %H:%i:%S' ) as create_time, status FROM sj_user WHERE id=?`;
  query(sql,req.params.userId,(err,result)=>{
    if(err){util.handleError(res,err)}
    res.json({
      code:200,
      message:"success",
      data:result[0]
    })
  })
}
updateUserOfId=(req,res)=>{
  util.needLogin(req,res);
  let str='';
  let paramsArr=[]
  for(let key in req.body){
    str+=`${key}=?,`;
    paramsArr.push(req.body[key]);
  }
  str = str.slice(0, str.length - 1);
  let sql= `UPDATE sj_user SET ${str} WHERE id=?`;
  paramsArr.push(req.params.userId);
  query(sql,paramsArr,(err,result)=>{
    if(err){util.handleError(res,err)}
    res.json({
      code:200,
      message:'success'
    })
  })
}
module.exports = {
  getUser,
  getUserOfId,
  updateUserOfId
}
