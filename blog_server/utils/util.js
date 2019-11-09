handleError = (res, err) => {
    res.status(500).json({
      code: 500,
      err: err,
      message: '服务器异常'
    })
  }
  needLogin = (req, res) => {
    if (!req.session.user) {
      res.status(401).json({
        code: 401,
        message: '登录身份过期'
      });
    }
  }
  module.exports = {
    handleError,
    needLogin
  }