
var express = require('express');
var router = express.Router();
//引入数据库链接模块
var connection=require("./mysqlter");

/* 商品添加 */
// cg_fatherID,cg_name,cg_isLocked
router.post("/add",function(req,res) {
    //接受前端数据
    let {cg_id,barcode,goodsname,goodsprice,marketprice,saleprice,stockNum,weigth,unit,promotion,discount,goodsDetails}=req.body;
    // var selecter=`insert into usertable(userName,userPwd,userGroup)values('${username}','${pass}','${region}')`;
    //用问号占位
    var selecter="insert into goodstable(cg_id,barcode,goodsname,goodsprice,marketprice,saleprice,stockNum,weigth,unit,promotion,discount,goodsDetails)values(?,?,?,?,?,?,?,?,?,?,?,?)";
    //船舰一个变量来保存值
    var sqlpdown=[cg_id,barcode,goodsname,goodsprice,marketprice,saleprice,stockNum,weigth,unit,promotion,discount,goodsDetails];
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
    let mysqld="select * from categorygoods";
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


//获取数据
router.get("/listered",function (req,res,next) {
    //查询列表
    let mysqld="select * from goodstable";
    connection.query(mysqld,function (error,result) {
        if (error) throw error;
        res.send(result);
    })

});
router.get("/listereder",function (req,res,next) {
    //查询列表
    let mysqld="select * from goodstable";
    connection.query(mysqld,function (error,result) {
        if (error) throw error;
        res.send(result);
    })

});
//商品删除
router.get("/deleterdshp",function (req,res,next) {
//获取id
    var id=req.query.good_id;
    //res.send(id);
    //接受前端数据
    let deleter="delete from goodstable where good_id=?";
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
router.post('/savelave', function(req, res, next) {
//接受传值
    let id=req.body.id;
    //数据库修改
    let mysqlchecked="select * from goodstable where cg_id=?";
    let vler=[id];
    connection.query(mysqlchecked,vler,function (error,result) {
        if(error) throw error;
        res.send(result)
    })
});
//发送给前端
router.post("/savelaver",function(req,res) {
    //接受前端数据
    console.log(req);
    let id=req.body.id;
    // var selecter=`insert into usertable(userName,userPwd,userGroup)values('${username}','${pass}','${region}')`;
    //用问号占位
    var selecter="select * from goodstable where good_id=?";
    let seld=[id];
//执行mysql语句
    connection.query(selecter,seld,function (error,result) {
        if (error) throw error;
         res.send(result)
    });
});
//修改
router.post("/addlist",function(req,res) {
    //接受前端数据
    let {good_id,barcode,goodsname,goodsprice,marketprice,saleprice,stockNum,weigth,unit,promotion,discount,goodsDetails,cg_id}=req.body;
    //res.send(req.body);
  // var selecter=`insert into usertable(userName,userPwd,userGroup)values('${username}','${pass}','${region}')`;
   //用问号占位
    var selecter="update goodstable set good_id=?,barcode=?,goodsname=?,goodsprice=?,marketprice=?,saleprice=?,stockNum=?,weigth=?,unit=?,promotion=?,discount=?,goodsDetails=? where cg_id=?";
//     //船舰一个变量来保存值
  var sqlpdown=[good_id,barcode,goodsname,goodsprice,marketprice,saleprice,stockNum,weigth,unit,promotion,discount,goodsDetails,cg_id];
//执行mysql语句
    connection.query(selecter,sqlpdown,function (error,result) {
         if (error) throw error;
       if(result.affectedRows>0){
           res.send({isOKed:true,msg:"商品修改成功"});
       }else {
            res.send({isOKed:false,msg:"商品修改失败"});
       }
});
});



module.exports = router;



