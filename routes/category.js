var express = require('express');
var router = express.Router();
//引入数据库链接模块
var connection=require("./mysqlter");

/* 商品添加 */
// cg_fatherID,cg_name,cg_isLocked
router.post("/add",function(req,res) {
    //接受前端数据
    let {cg_fatherID,cg_name,cg_isLocked}=req.body;
    // var selecter=`insert into usertable(userName,userPwd,userGroup)values('${username}','${pass}','${region}')`;
    //用问号占位
    var selecter="insert into categorygoods(cg_fatherID,cg_name,cg_isLocked)values(?,?,?)";
    //创建一个变量来保存值
    var sqlpdown=[cg_fatherID,cg_name,cg_isLocked];
//执行mysql语句
    connection.query(selecter,sqlpdown,function (error,result) {
        if (error) throw error;
      if(result.affectedRows>0){
          res.send({isOK:true,msg:"分类添加成功"});
      }else {
          res.send({isOK:false,msg:"分类添加失败"});
      }
    });
});
// 商品管理列表
router.get("/list",function (req,res,next) {
 //查询列表
    let mysqld="select t1.*,t2.cg_name as father_name from categorygoods as t1 left join categorygoods as t2 on t1.cg_fatherID=t2.cg_id";
    connection.query(mysqld,function (error,result) {
        if (error) throw error;
        res.send(result);
    })

});
router.get("/lister",function (req,res,next) {
    //查询列表
    let mysqld="select * from categorygoods";
    connection.query(mysqld,function (error,result) {
        if (error) throw error;
        res.send(result);
    })

});

//商品删除
router.get("/deleterd",function (req,res,next) {
//获取id
    var id=req.query.cg_id;
    //res.send(id);
    //接受前端数据
    let deleter="delete from categorygoods where cg_id=?";
    let der=[id];
    connection.query(deleter,der,function (error,result) {
        if (error) throw error;
        if(result.affectedRows>0){
            res.send({isOK:true,msg:"删除成功"});
        }
        else {
            res.send({isOK:false,msg:"删除失败"})
        }
    })
});
//数据回调列表添加进数据库的路由
router.post('/save', function(req, res, next) {
//接受传值
    let id=req.body.id;
    //数据库修改
    let mysqlchecked="select * from categorygoods where cg_id=?";
    let vler=[id];
    connection.query(mysqlchecked,vler,function (error,result) {
        if(error) throw error;
        res.send(result)
    })
});
module.exports = router;



