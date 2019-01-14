var express = require('express');
var router = express.Router();
//引入md5加密
var md5=require("crypto");
//引入mysql数据库链接
var connection=require("./mysqlter");

/* GET users listing. */
router.post('/add', function(req, res, next) {
  //接受前端数据
  let {pass,username,region}=req.body;
  //md5加密
    pass=md5.createHash("md5").update(pass).digest("hex");
  // var selecter=`insert into usertable(userName,userPwd,userGroup)values('${username}','${pass}','${region}')`;
  //用问号占位
  var selecter="insert into usertable(userName,userPwd,userGroup)values(?,?,?)";
  //创建一个变量来保存值
  var sqlpdown=[username,pass,region];
//执行mysql语句
  connection.query(selecter,sqlpdown,function (error,result) {
    if (error) throw error;
    if (result.affectedRows>0){
      res.send({isOK:true,"msg":"数据添加成功"})
    }else {
      res.send({isOK:false,"msg":"数据添加失败"})
    }
  });
});



// 用户管理列表
router.get("/list",function (req,res,next) {
    let accout=`select * from usertable`;
  connection.query(accout,function (error,result) {
    if(error) throw error;
    res.send(result);
  });

});
//用户删除
router.get("/deleter",function (req,res) {
  //接受前端数据
  let dater=req.query.u_id;
  let deleter=`delete from usertable where u_id=${dater}`;
  connection.query(deleter,function (error,result) {
    if (error) throw error;
    res.send(result)
  })
});
//用户编辑数据
router.get("/editdata",function (req,res) {
  let id=req.query.id;//获取id
  let iddata="select * from usertable where u_id=?";
  let sqlcer=[id];
  connection.query(iddata,sqlcer,function (error,datauser) {
    if (error) throw error;
    res.send(datauser)
  })

});

//数据回调列表添加进数据库的路由
router.post('/save', function(req, res, next) {
  //接受前端数据
  let {pass,username,region,u_id}=req.body;
  //md5加密
  pass=md5.createHash("md5").update(pass).digest("hex");
  // var selecter=`insert into usertable(userName,userPwd,userGroup)values('${username}','${pass}','${region}')`;
  //用问号占位
  var selecter="update usertable set userName=?,userPwd=?,userGroup=? where u_id=?";
  //船舰一个变量来保存值
  var sqlpdown=[username,pass,region,u_id];
//执行mysql语句
  connection.query(selecter,sqlpdown,function (error,result) {
    if (error) throw error;
    if (result.affectedRows>0){
      res.send({"isOK":true,"msg":"数据修改成功"})
    }else {
      res.send({"isOK":false,"msg":"数据修改失败"})
    }
  });
});
//登陆验证
router.post("/userpwd",function (req,res,next) {
  //验证账号和密码
  var username=req.body.username;
  var pwd=req.body.pws;
  //md5加密
  pwd=md5.createHash("md5").update(pwd).digest("hex");
  //数据库验证
  var msqchack="select u_id from usertable where userName=? and userPwd=?";
  var mysqler=[username,pwd];

  connection.query(msqchack,mysqler,function (err,result) {
    console.log(result);
    if (err) throw err;
    if(result.length>0){
      res.cookie("username","username");
      res.cookie("u_id","result[0].u_id");

      res.send({isOK:true,msg:"登陆成功"})
    }
    else {
      res.send({isOK:false,msg:"登陆失败"})
    }
  })
});
//建立cookie
router.get("/cheack",function (req,res) {
  var username=req.cookies.username;
  if(!username){
    res.send("alert('请先登录');location.href='login.html';")
  }else {
    res.send();
  }
});
//清除cookie
router.get("/cheackout",function (req,res) {
 res.clearCookie("username");
  res.clearCookie("u_id");
  res.redirect('/login.html');
});

module.exports = router;
