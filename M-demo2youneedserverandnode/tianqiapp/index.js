//引入框架 express
//创建experss实例
var express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    querystring = require('querystring'),
    urlib = require('url'),
    // router=require("router"),
multer = require('multer'),

    cookieParser = require('cookie-parser'),//用于取cookie
    urlencodeParser = bodyParser.urlencoded({extended: false}); //处理表单提交的信息









var users = {}; //存放用户名和密码的Json

//搭建服务器
var server = http.createServer(function(req,res){
    var str = '';
    req.on('data',function(data){
        str+=data;
    });
    req.on('end',function(){
        var obj = urlib.parse(req.url,true);
        const url = obj.pathname;
        const GET = obj.query;
        const POST = querystring.parse(str);
        //区分接口、文件
        if(url=='/user'){ //接口
            switch(GET.act){
                case 'reg': //注册
                    //检查用户名是否存在
                    if(users[GET.user]){
                        res.write('{"ok":false,"msg":"用户名已存在"}');
                    }else{ //插入到users
                        users[GET.user]=GET.pass;
                        res.write('{"ok":true,"msg":"注册成功"}');
                    }
                    break;
                case 'login': //登录
                    //检测用户名是否存在
                    if(users[GET.user]==null){
                        res.write('{"ok":false,"msg":"用户名不存在"}');
                    }else if(users[GET.user]!=GET.pass){//检测用户名和密码是否匹配
                        res.write('{"ok":false,"msg":"用户名或密码错误"}');
                    }else{//登录成功
                        res.write('{"ok":true,"msg":"登录成功"}');
                    }
                    break;
                default:
                    res.write('{"ok":false,"msg":"未知的act"}');
            }
            res.end();
        }else{
            //读取文件
            var file_name = './www'+url;
            fs.readFile(file_name,function(err,data){
                if(err){
                    res.write('404');
                }else{
                    res.write(data);
                }
                res.end();
            });
        }
    });
});



















app.use(express.static('../assets'))

//上传文件部分需要
var uploadFolder = '../assets/uploads/'

var createFolder = function(folder){
    try{
        fs.accessSync(folder)
    }catch(e){
        fs.mkdirSync(folder)
    }
}
createFolder(uploadFolder)

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder)
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    }
})

var upload = multer({storage: storage})
//end上传文件部分需要


//连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/tests')


mongoose.connection.on( 'connected', () => {
    console.log('数据库连接成功！');
});

mongoose.connection.on( 'error', () => {
    console.log('数据库连接失败！');
});

mongoose.connection.on( 'disconnected', () => {
    console.log('数据库连接断开！');
});









var testSchema = new mongoose.Schema({
    title: String,


})
var imgSchema = new mongoose.Schema({
    img: String,


})
var mainSchema = new mongoose.Schema({
    title: String,
    img: String
})


// module.exports = mongoose.model('Good',produtSchema);


dbimg4 = mongoose.model('index9', imgSchema)/*用来存放图片的collection*/
db4 = mongoose.model('index10', testSchema)/*纯标题*/
main4= mongoose.model('index11', mainSchema)/*用于图片和文字的段落*/
dbimg3 = mongoose.model('index6', imgSchema)/*用来存放图片的collection*/
db3 = mongoose.model('index7', testSchema)/*纯标题*/
main3= mongoose.model('index8', mainSchema)/*用于图片和文字的段落*/
dbimg2 = mongoose.model('index3', imgSchema)/*用来存放图片的collection*/
db2 = mongoose.model('index4', testSchema)/*纯标题*/
main2= mongoose.model('index5', mainSchema)/*用于图片和文字的段落*/
dbimg1 = mongoose.model('index', imgSchema)/*用来存放图片的collection*/
db1 = mongoose.model('index1', testSchema)/*纯标题*/
main1= mongoose.model('index2', mainSchema)/*用于图片和文字的段落*/
dbimg = mongoose.model('hellos', imgSchema)/*用来存放图片的collection*/
db = mongoose.model('nodeproject', testSchema)/*纯标题*/
main= mongoose.model('main', mainSchema)/*用于图片和文字的段落*/
dbimg5 = mongoose.model('index12', imgSchema)/*用来存放图片的collection*/
db5 = mongoose.model('index13', testSchema)/*纯标题*/
main5= mongoose.model('index14', mainSchema)/*用于图片和文字的段落*/
db6 = mongoose.model('index15', testSchema)/*纯标题*/
//end数据库部分


//页面模板路由

//
app.get('/main-index', function(req, res){
    res.sendFile(__dirname + '/html/back-html/main-index.html')
})
app.get('/admin-index', function(req, res){
    res.sendFile(__dirname + '/html/back-html/admin-index.html')
})

app.get('/yule-index', function(req, res){
    res.sendFile(__dirname + '/html/back-html/yule-index.html')
})

app.get('/fankui-detail/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/fankui-detail.html')
})
app.get('/admin-detail/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/admin-detail.html')
})

app.get('/admin-detail-img/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/admin-detail-img.html')
})
app.get('/admin-detail-main/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/admin-detail-main.html')
})

app.get('/admin-add', function(req, res){
    res.sendFile(__dirname + '/html/back-html/admin-add.html')
})
app.get('/admin-add-img', function(req, res){
    res.sendFile(__dirname + '/html/back-html/admin-add-img.html')
})
app.get('/admin-add-main', function(req, res){
    res.sendFile(__dirname + '/html/back-html/admin-add-main.html')
})
app.get('/yule-detail/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/yule-detail.html')
})

app.get('/yule-detail-img/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/yule-detail-img.html')
})
app.get('/yule-detail-main/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/yule-detail-main.html')
})

app.get('/yule-add', function(req, res){
    res.sendFile(__dirname + '/html/back-html/yule-add.html')
})
app.get('/yule-add-img', function(req, res){
    res.sendFile(__dirname + '/html/back-html/yule-add-img.html')
})
app.get('/yule-add-main', function(req, res){
    res.sendFile(__dirname + '/html/back-html/yule-add-main.html')
})

app.get('/news', function(req, res){
    res.sendFile(__dirname + '/news.html')
})
app.get('/index', function(req, res){
    res.sendFile(__dirname + '/index.html')
})
app.get('/index-index', function(req, res){
    res.sendFile(__dirname + '/html/back-html/index-index.html')
})
app.get('/index-detail/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/index-detail.html')
})

app.get('/index-detail-img/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/index-detail-img.html')
})
app.get('/index-detail-main/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/index-detail-main.html')
})

app.get('/index-add', function(req, res){
    res.sendFile(__dirname + '/html/back-html/index-add.html')
})
app.get('/index-add-img', function(req, res){
    res.sendFile(__dirname + '/html/back-html/index-add-img.html')
})
app.get('/index-add-main', function(req, res){
    res.sendFile(__dirname + '/html/back-html/index-add-main.html')
})


app.get('/new-index', function(req, res){
    res.sendFile(__dirname + '/html/back-html/new-index.html')
})
app.get('/new-detail/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/new-detail.html')
})

app.get('/new-detail-img/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/new-detail-img.html')
})
app.get('/new-detail-main/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/new-detail-main.html')
})

app.get('/new-add', function(req, res){
    res.sendFile(__dirname + '/html/back-html/new-add.html')
})
app.get('/new-add-img', function(req, res){
    res.sendFile(__dirname + '/html/back-html/new-add-img.html')
})
app.get('/new-add-main', function(req, res){
    res.sendFile(__dirname + '/html/back-html/new-add-main.html')
})

app.get('/new', function(req, res){
    res.sendFile(__dirname + '/new.html')
})

app.get('/war-index', function(req, res){
    res.sendFile(__dirname + '/html/back-html/war-index.html')
})
app.get('/war-detail/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/war-detail.html')
})

app.get('/war-detail-img/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/war-detail-img.html')
})
app.get('/war-detail-main/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/war-detail-main.html')
})

app.get('/war-add', function(req, res){
    res.sendFile(__dirname + '/html/back-html/war-add.html')
})
app.get('/war-add-img', function(req, res){
    res.sendFile(__dirname + '/html/back-html/war-add-img.html')
})
app.get('/war-add-main', function(req, res){
    res.sendFile(__dirname + '/html/back-html/war-add-main.html')
})



app.get('/main-detail/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/main-detail.html')
})

app.get('/main-detail-img/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/main-detail-img.html')
})
app.get('/main-detail-main/:id', function(req, res){
    res.sendFile(__dirname + '/html/back-html/main-detail-main.html')
})

app.get('/main-add', function(req, res){
    res.sendFile(__dirname + '/html/back-html/main-add.html')
})
app.get('/main-add-img', function(req, res){
    res.sendFile(__dirname + '/html/back-html/main-add-img.html')
})
app.get('/main-add-main', function(req, res){
    res.sendFile(__dirname + '/html/back-html/main-add-main.html')
})

app.get('/news/:id', function(req, res){
    res.sendFile(__dirname + '/html/news-1.html')
})
app.get('/login1', function(req, res){
    res.sendFile(__dirname + '/html/back-html/login.html')
})
app.get('/fankui-index', function(req, res){
    res.sendFile(__dirname + '/html/back-html/fankui-index.html')
})



app.get('/fankui', function(req, res){
    res.sendFile(__dirname + '/html/fankui.html')
})
app.get('/login', function(req, res){
    res.sendFile(__dirname + '/html/login.html')
})

app.get('/sign', function(req, res){
    res.sendFile(__dirname + '/html/sign.html')
})
app.get('/my', function(req, res){
    res.sendFile(__dirname + '/html/my.html')
})
app.get('/enjoy', function(req, res){
    res.sendFile(__dirname + '/html/enjoy.html')
})
app.get('/cloth', function(req, res){
    res.sendFile(__dirname + '/html/cloth.html')
})
app.get('/turist', function(req, res){
    res.sendFile(__dirname + '/html/turist.html')
})
app.get('/add', function(req, res){
    res.sendFile(__dirname + '/html/add.html')
})
app.get('/main', function(req, res){
    res.sendFile(__dirname + '/html/main.html')
})
app.get('/more', function(req, res){
    res.sendFile(__dirname + '/html/more.html')
})
app.get('/umbrella', function(req, res){
    res.sendFile(__dirname + '/html/umbrella.html')
})
app.get('/my1', function(req, res){
    res.sendFile(__dirname + '/html/my1.html')
})
app.get('/sugar', function(req, res){
    res.sendFile(__dirname + '/html/sugar.html')
})
app.get('/zhanghaoguanli', function(req, res){
    res.sendFile(__dirname + '/html/zhanghaoguanli.html')
})




//使用取cookie的中间件
app.use(cookieParser())

var setTime = function(exdays) {
    return new Date(Date.now() + (exdays * 24 * 60 * 60 * 1000))
}

app.use(function(req, res, next){
    if (req.cookies.token || !/admin/.test(req.originalUrl) ){
        console.log(req.originalUrl)
        next()
    }else{
        res.send('登录错误,请检查用户名和id')
    }
})


app.post('/signData', urlencodeParser, function(req, res){/*接收表单*/
    if (req.body.name == 'lll' && req.body.password == '123'){
        res.cookie('token1', '123', {expires: setTime(1), path: '/'})
        res.send({code: 0})
    }else{
        alert('登录失败')
        res.send({code: 1})
    }
})

//接口路由
app.post('/loginData', urlencodeParser, function(req, res){/*接收表单*/
    if (req.body.name == 'lll' && req.body.password == '123'){
        res.cookie('token1', '123', {expires: setTime(1), path: '/'})
        res.send({code: 0})
    }else{
alert('登录失败')
        res.send({code: 1})
    }
})

app.post('/loginData1', urlencodeParser, function(req, res){/*接收表单*/
    if (req.body.name == 'lll' && req.body.password == '123'){
        res.cookie('token', '123', {expires: setTime(1), path: '/'})
        res.send({code: 0})
    }else{
        alert('登录失败')
        res.send({code: 1})
    }
})



app.get('/getlist',function(req, res){
    db.find({}, function(err, data){
        res.send({list: data})
    })
})

app.get('/getlist-img',function(req, res){
    dbimg.find({}, function(err, data){
        res.send({list: data})
    })
})

app.get('/getlist-main',function(req, res){
    main.find({}, function(err, data){
        res.send({list: data})
    })
})

app.get('/getlist1',function(req, res){
    db1.find({}, function(err, data){
        res.send({list: data})
    })
})

app.get('/getlist1-img',function(req, res){
    dbimg1.find({}, function(err, data){
        res.send({list: data})
    })
})
app.get('/getlist1-main',function(req, res){
    main1.find({}, function(err, data){
        res.send({list: data})
    })
})

app.get('/getlist2',function(req, res){
    db2.find({}, function(err, data){
        res.send({list: data})
    })
})

app.get('/getlist2-img',function(req, res){
    dbimg2.find({}, function(err, data){
        res.send({list: data})
    })
})
app.get('/getlist2-main',function(req, res){
    main2.find({}, function(err, data){
        res.send({list: data})
    })
})


/*景区天气详情页2接口*/
app.get('/getlist3',function(req, res){
    db3.find({}, function(err, data){
        res.send({list: data})
    })
})

app.get('/getlist3-img',function(req, res){
    dbimg3.find({}, function(err, data){
        res.send({list: data})
    })
})

app.get('/getlist3-main',function(req, res){/*适用于渲染页面*/
    main3.find({}, function(err, data){
        res.send({list: data})
    })
})


/*景区天气详情页1接口*/
app.get('/getlist4',function(req, res){
    db4.find({}, function(err, data){
        res.send({list: data})
    })
})

app.get('/getlist4-img',function(req, res){
    dbimg4.find({}, function(err, data){
        res.send({list: data})
    })
})

app.get('/getlist4-main',function(req, res){
    main4.find({}, function(err, data){
        res.send({list: data})
    })
})



app.get('/getlist5',function(req, res){
    db5.find({}, function(err, data){
        res.send({list: data})
    })
})

app.get('/getlist5-img',function(req, res){
    dbimg5.find({}, function(err, data){
        res.send({list: data})
    })
})
app.get('/getlist5-main',function(req, res){
    main5.find({}, function(err, data){
        res.send({list: data})
    })
})

app.get('/getlist6',function(req, res){
    db6.find({}, function(err, data){
        res.send({list: data})
    })
})

app.get('/getlistItem-news/:id', function(req, res){
    db.find({_id: req.params.id},function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
/*结束*/


/*获取id,查出相应的信息*/
app.get('/getlistItem6/:id', function(req, res){
    db6.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
app.get('/getlistItem/:id', function(req, res){
    db.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
app.get('/getlistItem-img/:id', function(req, res){
    dbimg.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
app.get('/getlistItem-main/:id', function(req, res){
    main.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})



app.get('/getlistItem1/:id', function(req, res){
    db1.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
app.get('/getlistItem1-img/:id', function(req, res){
    dbimg1.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
app.get('/getlistItem1-main/:id', function(req, res){
    main1.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})

app.get('/getlistItem2/:id', function(req, res){
    db2.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
app.get('/getlistItem2-img/:id', function(req, res){
    dbimg2.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
app.get('/getlistItem2-main/:id', function(req, res){
    main2.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})


app.get('/getlistItem3/:id', function(req, res){
    db3.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
app.get('/getlistItem3-img/:id', function(req, res){
    dbimg3.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
app.get('/getlistItem3-main/:id', function(req, res){
    main3.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})


app.get('/getlistItem4/:id', function(req, res){
    db4.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
app.get('/getlistItem4-img/:id', function(req, res){
    dbimg4.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
app.get('/getlistItem4-main/:id', function(req, res){
    main4.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})


/*获取id,查出相应的信息*/
app.get('/getlistItem5/:id', function(req, res){
    db5.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
app.get('/getlistItem5-img/:id', function(req, res){
    dbimg5.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})
app.get('/getlistItem5-main/:id', function(req, res){
    main5.find({_id: req.params.id}, function(err, data){/*把id取下来，进行查询，
    找到相应的数据发送给客户端*/
        res.send({info: data[0], code:0})/*新建个容器叫info,里面放data.data是放内容的数组*/
    })
})


/*获取id,查出相应的信息，并删除*/
app.get('/del/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    db.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})
app.get('/del-img/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    dbimg.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})
app.get('/del-main/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    main.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})



app.get('/del1/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    db1.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})
app.get('/del1-img/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    dbimg1.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})
app.get('/del1-main/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    main1.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})

app.get('/del2/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    db2.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})
app.get('/del2-img/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    dbimg2.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})
app.get('/del2-main/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    main2.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})


app.get('/del3/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    db3.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})
app.get('/del3-img/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    dbimg3.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})
app.get('/del3-main/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    main3.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})


app.get('/del4/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    db4.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})
app.get('/del4-img/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    dbimg4.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})
app.get('/del4-main/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    main4.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})

app.get('/del6/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    db6.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})
/*获取id,查出相应的信息，并删除*/
app.get('/del5/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    db5.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})
app.get('/del5-img/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    dbimg5.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})
app.get('/del5-main/:id',function (req, res) {/*引用mongodb里面的代码去删除*/
    main5.find({_id: req.params.id}).remove(function(err, data) {
        if (err) throw err;
    });
    res.send({code: 0});
})


//获取详情页的id，与add一样，把数据拼接好
//使用update把相应的数据替换为传上来的数据
app.post('/update/:id', urlencodeParser, function(req, res){/*此处改动，原为:upload.single('img'),*/
    // var filename = '/uploads/' + req.file.filename,
    //     data = req.body;
    // data.img=filename;
       var data = req.body;
       // data.title = filename/*此处改动，原为data.img=filename*/
    db.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})
app.post('/update-img/:id', upload.single('img'), function(req, res){/*此处改动，原为:upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename,
        data = req.body;
    data.img=filename;

    // var filename = '/uploads/' + req.file.filename
    // // var data = req.body;
    //
    // // data.title = filename/*此处改动，原为data.img=filename*/
    dbimg.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})

app.post('/update-main/:id', upload.single('img'), function(req, res){/*此处改动，原为:upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename,
        data = req.body;
    data.img=filename;

    main.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})




app.post('/update1/:id', urlencodeParser, function(req, res){/*此处改动，原为:upload.single('img'),*/

    // var filename = '/uploads/' + req.file.filename,
    //     data = req.body;
    // data.img=filename;


    var data = req.body;
    // data.title = filename/*此处改动，原为data.img=filename*/
    db1.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})
app.post('/update1-img/:id', upload.single('img'), function(req, res){/*此处改动，原为:upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename,
        data = req.body;
    data.img=filename;
    dbimg1.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})

app.post('/update1-main/:id', upload.single('img'), function(req, res){/*此处改动，原为:upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename,
        data = req.body;
    data.img=filename;

    main1.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})


app.post('/update2/:id', urlencodeParser, function(req, res){/*此处改动，原为:upload.single('img'),*/

    // var filename = '/uploads/' + req.file.filename,
    //     data = req.body;
    // data.img=filename;


    var data = req.body;
    // data.title = filename/*此处改动，原为data.img=filename*/
    db2.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})
app.post('/update2-img/:id', upload.single('img'), function(req, res){/*此处改动，原为:upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename,
        data = req.body;
    data.img=filename;
    dbimg2.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})

app.post('/update2-main/:id', upload.single('img'), function(req, res){/*此处改动，原为:upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename,
        data = req.body;
    data.img=filename;

    main2.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})


app.post('/update3/:id', urlencodeParser, function(req, res){/*此处改动，原为:upload.single('img'),*/
    // var filename = '/uploads/' + req.file.filename,
    //     data = req.body;
    // data.img=filename;
    var data = req.body;
    // data.title = filename/*此处改动，原为data.img=filename*/
    db3.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})
app.post('/update3-img/:id', upload.single('img'), function(req, res){/*此处改动，原为:upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename,
        data = req.body;
    data.img=filename;

    // var filename = '/uploads/' + req.file.filename
    // // var data = req.body;
    //
    // // data.title = filename/*此处改动，原为data.img=filename*/
    dbimg3.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})

app.post('/update3-main/:id', upload.single('img'), function(req, res){/*此处改动，原为:upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename,
        data = req.body;
    data.img=filename;

    main3.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})


app.post('/update4/:id', urlencodeParser, function(req, res){/*此处改动，原为:upload.single('img'),*/
    // var filename = '/uploads/' + req.file.filename,
    //     data = req.body;
    // data.img=filename;
    var data = req.body;
    // data.title = filename/*此处改动，原为data.img=filename*/
    db4.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})
app.post('/update4-img/:id', upload.single('img'), function(req, res){/*此处改动，原为:upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename,
        data = req.body;
    data.img=filename;

    // var filename = '/uploads/' + req.file.filename
    // // var data = req.body;
    //
    // // data.title = filename/*此处改动，原为data.img=filename*/
    dbimg4.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})

app.post('/update4-main/:id', upload.single('img'), function(req, res){/*此处改动，原为:upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename,
        data = req.body;
    data.img=filename;

    main4.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})


app.post('/update5/:id', urlencodeParser, function(req, res){/*此处改动，原为:upload.single('img'),*/

    // var filename = '/uploads/' + req.file.filename,
    //     data = req.body;
    // data.img=filename;


    var data = req.body;
    // data.title = filename/*此处改动，原为data.img=filename*/
    db5.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})
app.post('/update5-img/:id', upload.single('img'), function(req, res){/*此处改动，原为:upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename,
        data = req.body;
    data.img=filename;
    dbimg5.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})

app.post('/update5-main/:id', upload.single('img'), function(req, res){/*此处改动，原为:upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename,
        data = req.body;
    data.img=filename;

    main5.update({_id: req.params.id}, {$set:data}, function(err){
        if (err) throw err;
        console.log('it is save')
        res.send({code: 0})
    })
})


//先取得图片的名字+存图片的文件夹，拼成客户端能访问的路径，保存到数据库里
app.post('/add',urlencodeParser, function(req, res){/*此处改动，原为, upload.single('img'),*/
    // var filename = '/uploads/' + req.file.filename,
      var  data = req.body;//不含图片的内容。把非图片的其他字段都放在data
console.log(data);
    // data.title = filename//把图片的路径存到一起，此处改动
    db(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})

app.post('/add-img',upload.single('img'), function(req, res){/*此处改动，原为, upload.single('img'),*/
    var filename = '/uploads/' + req.file.filename
         var data = req.body;
 data.img=filename;
    //  var filename = '/uploads/' + req.file.filename
    //   // data = req.body;//不含图片的内容。把非图片的其他字段都放在data
    // // console.log(data);
    //  // data.title = filename//把图片的路径存到一起，此处改动
    dbimg(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})

app.post('/add-main',upload.single('img'), function(req, res){/*此处改动，原为, upload.single('img'),*/
    var filename = '/uploads/' + req.file.filename
    var data = req.body;
    data.img=filename;
    main(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})


app.post('/add1',urlencodeParser, function(req, res){/*此处改动，原为, upload.single('img'),*/
    // var filename = '/uploads/' + req.file.filename,
    var  data = req.body;//不含图片的内容。把非图片的其他字段都放在data
    console.log(data);
    // data.title = filename//把图片的路径存到一起，此处改动
    db1(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})

app.post('/add1-img',upload.single('img'), function(req, res){/*此处改动，原为, upload.single('img'),*/
    var filename = '/uploads/' + req.file.filename
    var data = req.body;
    data.img=filename;
    //  var filename = '/uploads/' + req.file.filename
    //   // data = req.body;//不含图片的内容。把非图片的其他字段都放在data
    // // console.log(data);
    //  // data.title = filename//把图片的路径存到一起，此处改动
    dbimg1(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})

app.post('/add1-main',upload.single('img'), function(req, res){/*此处改动，原为, upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename
    var data = req.body;
    data.img=filename;
    console.log(data)
    main1(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})


app.post('/add2',urlencodeParser, function(req, res){/*此处改动，原为, upload.single('img'),*/
    // var filename = '/uploads/' + req.file.filename,
    var  data = req.body;//不含图片的内容。把非图片的其他字段都放在data
    console.log(data);
    // data.title = filename//把图片的路径存到一起，此处改动
    db2(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})

app.post('/add2-img',upload.single('img'), function(req, res){/*此处改动，原为, upload.single('img'),*/
    var filename = '/uploads/' + req.file.filename
    var data = req.body;
    data.img=filename;
    //  var filename = '/uploads/' + req.file.filename
    //   // data = req.body;//不含图片的内容。把非图片的其他字段都放在data
    // // console.log(data);
    //  // data.title = filename//把图片的路径存到一起，此处改动
    dbimg2(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})

app.post('/add2-main',upload.single('img'), function(req, res){/*此处改动，原为, upload.single('img'),*/

    var filename = '/uploads/' + req.file.filename
    var data = req.body;
    data.img=filename;
    console.log(data)
    main2(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})


app.post('/add3',urlencodeParser, function(req, res){/*此处改动，原为, upload.single('img'),*/
    // var filename = '/uploads/' + req.file.filename,
    var  data = req.body;//不含图片的内容。把非图片的其他字段都放在data
    console.log(data);
    // data.title = filename//把图片的路径存到一起，此处改动
    db3(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})

app.post('/add3-img',upload.single('img'), function(req, res){/*此处改动，原为, upload.single('img'),*/
    var filename = '/uploads/' + req.file.filename
    var data = req.body;
    data.img=filename;
    //  var filename = '/uploads/' + req.file.filename
    //   // data = req.body;//不含图片的内容。把非图片的其他字段都放在data
    // // console.log(data);
    //  // data.title = filename//把图片的路径存到一起，此处改动
    dbimg3(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})

app.post('/add3-main',upload.single('img'), function(req, res){/*此处改动，原为, upload.single('img'),*/
    var filename = '/uploads/' + req.file.filename
    var data = req.body;
    data.img=filename;
    main3(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})



app.post('/add4',urlencodeParser, function(req, res){/*此处改动，原为, upload.single('img'),*/
    // var filename = '/uploads/' + req.file.filename,
    var  data = req.body;//不含图片的内容。把非图片的其他字段都放在data
    console.log(data);
    // data.title = filename//把图片的路径存到一起，此处改动
    db4(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})

app.post('/add4-img',upload.single('img'), function(req, res){/*此处改动，原为, upload.single('img'),*/
    var filename = '/uploads/' + req.file.filename
    var data = req.body;
    data.img=filename;
    //  var filename = '/uploads/' + req.file.filename
    //   // data = req.body;//不含图片的内容。把非图片的其他字段都放在data
    // // console.log(data);
    //  // data.title = filename//把图片的路径存到一起，此处改动
    dbimg4(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})

app.post('/add4-main',upload.single('img'), function(req, res){/*此处改动，原为, upload.single('img'),*/
    var filename = '/uploads/' + req.file.filename
    var data = req.body;
    data.img=filename;
    main4(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})


app.post('/add5',urlencodeParser, function(req, res){/*此处改动，原为, upload.single('img'),*/
    // var filename = '/uploads/' + req.file.filename,
    var  data = req.body;//不含图片的内容。把非图片的其他字段都放在data
    console.log(data);
    // data.title = filename//把图片的路径存到一起，此处改动
    db5(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})

app.post('/add5-img',upload.single('img'), function(req, res){/*此处改动，原为, upload.single('img'),*/
    var filename = '/uploads/' + req.file.filename
    var data = req.body;
    data.img=filename;
    //  var filename = '/uploads/' + req.file.filename
    //   // data = req.body;//不含图片的内容。把非图片的其他字段都放在data
    // // console.log(data);
    //  // data.title = filename//把图片的路径存到一起，此处改动
    dbimg5(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})

app.post('/add5-main',upload.single('img'), function(req, res){/*此处改动，原为, upload.single('img'),*/
    var filename = '/uploads/' + req.file.filename
    var data = req.body;
    data.img=filename;
    main5(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})

app.post('/add6',urlencodeParser, function(req, res){/*此处改动，原为, upload.single('img'),*/
    // var filename = '/uploads/' + req.file.filename,
    var  data = req.body;//不含图片的内容。把非图片的其他字段都放在data
    console.log(data);
    // data.title = filename//把图片的路径存到一起，此处改动
    db6(data).save(function(err){/*把整个data存到数据库里*/
        if (err) throw err;
        res.send({code: 0})/*返回code表示保存成功*/
    })
})
//end接口路由


//
// app.post('/reg',function (req,res,next) {
//     console.log("req.body"+req.body);
//     user2.findDocuments(DATABASE, "users", 1, {"uName":req.body.username}, function (user) {
//         res.setHeader('Content-Type', 'application/json;charset=utf-8');
//         if(user.length==0){
//             user2.insertDocuments(DATABASE, "users",
//                 [{
//                     "uName": req.body.username,
//                     "uPasswd": req.body.password,
//                     "uEmail": req.body.email,
//                     "uHasshop": 0,
//                     "uShopname": "null",
//                     "aId": '-1'
//                 }],
//                 function (result) {
//                     res.send({status: "success", message: "true"});
//                 }
//             );
//                 }
//                 else{
//             res.send({status:"success", message:"false"});
//                 }
//
//     });});




app.listen(3000, function(req, res){
    console.log('已经可以访问啦 http://localhost:3000');
})