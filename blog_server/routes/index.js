var express = require('express');
var router = express.Router();
var admin=require('./admin');
var article=require('./article');
var user=require('./users');
var comment=require('./comment');
var cate=require('./cate');
var flink=require('./flink')
var multer  = require('multer');
var path = require('path');
var UUID=require('uuid');

var storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/images'),
  filename: function(req, file, cb) {
      let extName = file.originalname.slice(file.originalname.lastIndexOf('.'))
      let fileName = UUID.v1()
      cb(null, fileName + extName)
  }
})
var imageFilter = function(req, file, cb){
  var acceptableMime = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
  if(acceptableMime.indexOf(file.mimetype) !== -1){
      cb(null, true)
  }else{
      cb(null, false)
  }
}

var upload = multer({ 
  storage: storage,
  fileFilter:imageFilter
})

router.get('/',(req, res)=>{
  res.json({
    code:10000,
    message:"测试接口连接成功..."
  })
});
router.post('/adminLogin',(req,res)=>{
  admin.adminLogin(req,res)
})
router.get('/getCate',(req,res)=>{
  cate.getCate(req,res)
})
router.get('/getLabel',(req,res)=>{
  cate.getLabel(req,res)
})
router.post('/release',upload.single('cover'),(req,res)=>{
  article.release(req,res)
})
router.get('/getArticle',(req,res)=>{
  article.getArticleOfCate(req,res)
})
router.get('/getArticle/:articleId(\\d+)', function (req, res) {
  article.getArticleOfId(req, res);
});
router.put('/updateArticle/:articleId(\\d+)',upload.single('cover'), function (req, res) {
  article.updateArticleOfId(req, res);
});
router.get('/deleteArticle',(req,res)=>{
  article.deleteArticleOfId(req,res)
})
//用户模块
router.get('/getUser',(req,res)=>{
  user.getUser(req,res)
})
router.get('/getUser/:userId(\\d+)',(req,res)=>{
  user.getUserOfId(req,res)
})
router.put('/updateUser/:userId(\\d+)',function(req, res){
  user.updateUserOfId(req, res);
});

//评论模块
router.get('/getComment',(req, res)=>{
  comment.getComment(req,res)
});
router.put('/updateStatus/:commentId(\\d+)',(req, res)=>{
  comment.updateStatus(req,res)
});
router.get('/deleteComment/:commentId(\\d+)',(req, res)=>{
  comment.deleteCommentOfId(req,res)
});
router.post('/addComment',(req,res)=>{
  comment.addComment(req,res)
})
//友链模块
router.get('/getFlink',(req,res)=>{
  flink.getFlink(req,res);
})
router.get('/getFlink/:flinkId(\\d+)',(req,res)=>{
  flink.getFlinkOfId(req,res)
})
router.put('/updateFlink/:flinkId(\\d+)',(req,res)=>{
  flink.updateFlinkOfId(req,res)
})
router.put('/updateFlinkStatus/:flinkId(\\d+)',(req,res)=>{
  flink.updateStatusOfId(req,res)
})
router.post('/addFlink',(req,res)=>{
  flink.addFlink(req,res)
})

module.exports = router;
