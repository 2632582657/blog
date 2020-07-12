var mysql=require("mysql")
var env=require('./utils/env')
var pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:env.pwd,
    database:env.database,
    port:3306,
    connectionLimit:20
})
var query=function(sql,options,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null);
        }else{
            conn.query(sql,options,function(err,results){
                //释放连接  
                
                //事件驱动回调  
                callback(err,results);
            });
        }
        conn.release();
    });
};

module.exports=query