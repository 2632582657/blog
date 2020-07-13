var query = require('../pool.js');
const env = require('../utils/env');
var util = require('../utils/util');
const path = require('path');
const fs = require('fs');

addAudio = (req, res) => {
    util.needLogin(req,res)
    let {name,author,audioCover,audioFileName,audioLrcName} = req.body;
    function searchFn(sql, params, fn) {
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
    if (JSON.stringify(req.body) == "{}") {
        res.status(500).json({
            code: 500,
            message: "接收数据为空"
        });
        return;
    }else{
        if(audioCover && audioFileName){
            if(!reg.test(audioCover) || !reg.test(audioFileName)){
                res.status(500).json({
                    code: 500,
                    message: "链接不符合规范"
                });
                return
            }
        }
        if(audioLrcName){
            if(!reg.test(audioLrcName)){
                res.status(500).json({
                    code: 500,
                    message: "链接不符合规范"
                });
                return
            }
        }
    }
    let sql = `SELECT id, name, author FROM sj_audio WHERE name LIKE ?`;
    let addSql = `INSERT INTO sj_audio(name, author, audio_cover, audio ${audioLrcName ? ',audio_lrc' : ''}) VALUES (?,?,?,?${audioLrcName ? ',?' : ''})`
    let paramsArr = [name, author, audioCover, audioFileName]
    if(audioLrcName){paramsArr.push(audioLrcName);}
    (async function () {
        try {
            let searchResult = null
            await searchFn(sql, [`%${name}%`], (result) => {
                searchResult = result
            })
            if (!audioFileName) {
                if (searchResult && searchResult.length > 0) {
                    res.json({
                        code: 403,
                        message: '当前歌曲已经存在'
                    })
                }else{
                    res.json({
                        code: 200,
                        message: 'success'
                    })
                }
                return;
            } else {
                await searchFn(addSql, paramsArr, (addResult) => {
                    let date=new Date().Format("yyyy-MM-dd hh:mm:ss");
                    if (addResult.affectedRows && addResult.affectedRows > 0) {
                        res.json({
                            code: 200,
                            message: 'success',
                            data: {
                                id:addResult.insertId,
                                create_time:date
                            }
                        })
                    } else {
                        res.status(500).json({
                            code: 500,
                            message: '未知原因，上传歌曲失败'
                        })
                    }
                })
            }

        } catch (error) {
            if (error) { console.log(error) }
        }
    })()

}
getAudio=(req,res)=>{
    if(req.query.adm){util.needLogin(req,res);}
    let page = req.query.page ? req.query.page : 1;
    if (page < 1) {
        res.status(403).json({
            code: 403,
            message: "this page min is 1"
        })
        return;
    }
    function searchFn(sql, params, fn) {
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
    (async function(){
        try {
            if(req.query.search){
                if (!req.query.id && !req.query.name && !req.query.author) {
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
                if (req.query.name) {
                    keyStr += `AND name Like ?`;
                    arr.push(`%${req.query.name}%`)
                }
                if (req.query.author) {
                    keyStr += `AND author Like ?`;
                    arr.push(`%${req.query.author}%`)
                }
                keyStr = keyStr.slice(3)
                let searchCount = `SELECT COUNT(id) AS count FROM sj_audio WHERE ${keyStr}`;
                let sqlSearch =
                    `SELECT 
                            id,
                            name,
                            author,
                            date_format(create_time,'%Y-%m-%d %H:%i:%S' ) as create_time
                        FROM 
                            sj_audio
                        WHERE
                            ${keyStr}
                        ORDER BY
                            create_time DESC
                        LIMIT ?,10
                        `
                let pageObj;
                await searchFn(searchCount,arr,(resultCount)=>{
                    pageObj = resultCount
                })
                await searchFn(sqlSearch,[...arr,(page - 1) * 10],(result)=>{
                    res.json({
                        code: 200,
                        message: 'success',
                        data: {
                            audioList: result,
                            page: {
                                currentPage: parseInt(page),
                                pageCount: Math.ceil(pageObj[0].count / 10)
                            }
                        }
                    })
                })
            }else{
                let str='';
                if(!req.query.adm){
                    str+=',author as artist,audio_cover as cover,audio as url, audio_lrc as lrc';
                }else{
                    str+=",author,id,date_format(create_time,'%Y-%m-%d %H:%i:%S' ) as create_time" 
                }
                let sqlCount = `SELECT COUNT(id) as count FROM sj_audio`
                let sql=
                    `SELECT  
                        name
                        ${str}
                    FROM 
                        sj_audio 
                    ORDER BY 
                        create_time DESC
                        ${!req.query.adm ? '' : 'LIMIT ?,10'}
                        `     
                if(!req.query.adm){
                    await searchFn(sql, [], (result) => {
                        res.json({
                            code:200,
                            message:'success',
                            data:result
                        })
                    })
                }else{
                    let pageObj;
                    await searchFn(sqlCount, [], (resultCount) => {
                        pageObj = resultCount
                    })
                    await searchFn(sql, (page - 1) * 10, (result) => {
                        res.json({
                            code: 200,
                            message: 'success',
                            data: {
                                audioList: result,
                                page: {
                                    currentPage: parseInt(page),
                                    pageCount: Math.ceil(pageObj[0].count / 10)
                                }
                            }
                        })
                    })
                }
            }
        } catch (error) {
            if(error){
                console.log(error);
            }
        }
    })()
}
deleteAudio=(req,res)=>{
    util.needLogin(req,res)
    function deleteAudio(sql,params,callback){
        return new Promise(function(resolve,reject){
            query(sql,params,(err,result)=>{
                if(err){
                    util.handleError(res,err)
                }
                callback(result)
                resolve()
            })
        })
    }
    let sqlFile=`SELECT audio_cover, audio, audio_lrc FROM sj_audio WHERE id=?`;
    let sql="DELETE FROM sj_audio WHERE id=?";
    (async function(){
        try {
            await deleteAudio(sqlFile,req.params.audioId,(fileResult)=>{
                if(fileResult.length===0){
                    res.json({
                        code:500,
                        message:'查询不到删除的内容'
                    })
                    return;
                }else{
                    let audio_lrc=null;
                    let audio_cover=path.join(__dirname, `../public/audio/audioCover/${path.basename(fileResult[0].audio_cover)}`);
                    let audio=path.join(__dirname, `../public/audio/audio/${path.basename(fileResult[0].audio)}`);
                    if(fileResult.audio_lrc){
                        audio_lrc=path.join(__dirname, `../public/audio/lrc/${path.basename(fileResult[0].audio_lrc)}`);
                    }
                    deleteAudio(sql,req.params.audioId,(result)=>{
                        if(result.affectedRows>0){
                            res.json({
                                code:200,
                                message:'success'
                            })
                            fs.unlinkSync(audio_cover);
                            fs.unlinkSync(audio);
                            if(audio_lrc){
                                fs.unlinkSync(audio_lrc);
                            }
                        }else{
                            res.status(500).json({
                                code:500,
                                message:'delete error'
                            })
                        }
                    })
                    
                }
            })
        } catch (error) {
            if(error){
                console.log(error)
            }
        }
    })()
}
module.exports = {
    addAudio,
    getAudio,
    deleteAudio
}