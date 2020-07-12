var query = require('../pool.js');
var util = require('../utils/util');
getAllCount=(req,res)=>{
    if(req.query.adm){
        util.needLogin(req,res);
    }
    sqlArticleCount=`SELECT COUNT(id) as count FROM sj_article WHERE category_id IS NOT NULL`;
    sqlLeaveMsgCount=`SELECT COUNT(id) as count FROM sj_comment WHERE article_id=10001`;
    sqlFlinkCount=`SELECT COUNT(id) as count FROM sj_f_link`;
    sqlCountOfCate=`SELECT a.category_id, c.name,count(a.id) as count FROM sj_article as a,sj_category as c
        WHERE a.category_id IS NOT NULL AND a.category_id=c.id
        GROUP BY  category_id`
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
            await getCount(sqlLeaveMsgCount,(result2)=>{
                data.leaveMsgCount=result2[0].count;
            })
            await getCount(sqlFlinkCount,(result3)=>{
                data.flinkCount=result3[0].count;
            })
            await getCount(sqlCountOfCate,(result4)=>{
                data.cateCount=result4
                result4.forEach((item,i)=>{
                    if(item.category_id===10001){
                        data.albumCount=item.count
                    }
                })
                res.json({
                    code:200,
                    message:'success',
                    data:data
                })
            })
            
        } catch (error) {
            console.log(error)
        }
    })()
}
getUpRate=(req,res)=>{
    util.needLogin(req,res);
    let dateList = [...Array(7).keys()].map(days => {
        let t = new Date(Date.now() - 86400000 * days);
        let str = `${t.getFullYear()}-${t.getMonth() + 1}-${t.getDate()}`;
        return str;
    });

    let strA='';
    let strU='';
    for (let i = 1; i < 7; i++) {
        strA+= `UNION ALL select COUNT(id) as d from sj_article where to_days(create_time) = to_days(now())-${i} AND category_id IS NOT NULL `
        strU+= `UNION ALL select COUNT(id) as d from sj_user where to_days(create_time) = to_days(now())-${i} `
    }
    
    let sqlA=`
    select a1.* from (
        select COUNT(id) as d from sj_article where  category_id IS NOT NULL 
        UNION ALL 
        select COUNT(id) as d from sj_article where to_days(create_time) = to_days(now()) AND category_id IS NOT NULL 
        ${strA}
    ) as a1    
    `
    let sqlU=`
    select a1.* from (
        select COUNT(id) as d from sj_user
        UNION ALL 
        select COUNT(id) as d from sj_user where to_days(create_time) = to_days(now())
        ${strU}
    ) as a1    
    `
    
    function getUp(sql){
        return new Promise(function (resolve, reject) {
            query(sql,(err, result) => {
                if (err) {
                    util.handleError(res, err);
                    reject(err);
                }
                resolve(result);
            });
        });
    }
    (async function(){
        try {
            let resultA= await getUp(sqlA);
            let arrA=[]
            let allA=resultA[0].d
            for (let i = 1; i < resultA.length; i++) {
                allA=allA-resultA[i].d
                arrA.unshift(allA)
            }
            arrA.push(resultA[0].d)
            arrA.shift();
            let resultU= await getUp(sqlU);
            let arrU=[]
            let allU=resultU[0].d
            for (let i = 1; i < resultU.length; i++) {
                allU=allU-resultU[i].d
                arrU.unshift(allU)
            }
            arrU.push(resultU[0].d)
            arrU.shift();

            res.json({
                code:200,
                message:'success',
                data:{
                    dateList:dateList.reverse(),
                    count:{
                        A:arrA,
                        U:arrU
                    }
                }
            })

        } catch (error) {
            console.log(error)
        }
    })()
}

module.exports = {
    getAllCount,
    getUpRate
}