//引入mysql数据库

var mysql=require('mysql');

//连接数据库
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'user'
});
//打开数据库
connection.connect();
//暴露模块
module.exports=connection;
