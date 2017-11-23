
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200/',
    log: 'trace'
});



const express = require("express");
const app = express();
var path = require("path");


//var server = require('http').createServer(app);
//var io = require('socket.io')(server);

app.use(express.static(__dirname+'/'));

var add = require('./AddProducts');
var search = require('./Search');
//var mapping = require('./initMapping');
var router = express.Router();
var data = [];


//add.test();
//mapping.initMapping('electronics','Products');
//add.addAll();

app.get("/home/",function (req,res) {
    res.sendFile(path.join(__dirname+'/Index.html'));
});

app.get("/home/products",function (req,res) {
    search.search('electronics','*').then((result)=>{

        res.send(result.hits.hits)
    });
});

app.get("/home/products/:ID?",function (req,res) {
    if(req.params.ID==='PC'||req.params.ID==='Tablet'||req.params.ID==='Phone'){
        search.search('electronics',req.params.ID).then((result)=>{
            res.send(result.hits.hits)
        });
    }else{
        res.status(404).send('Podales zla kategorie produktu!')
    }
});

router.use("/:ID?",function (req,res,next) {
    search.search('electronics',req.params.ID).then((result)=>{
            if(result.hits.total!=0){
                data = result.hits.hits;
                next();
            }else {
                res.status(404).send('Nie znaleziono produktów');
            }
        });
});

router.route("/:ID?")
    .get(function (req,res) {
        res.send(data);
    });

app.use('/home/',router);



/*app.get("/home/:ID?",function (req,res){
    search.search('produkty',req.params.ID).then((result)=>{

        res.send(result.hits.hits)

    });

});
*/

app.listen(3000,  ()=>{console.log("Witaj")});


/*io.on('connection',function (klient) {
    console.log('Polaczono');
    klient.on('clicked',function (data) {
        search.search('produkty',data).then((result)=>{
            res.send(result.hits.hits)
        });
    })
})
//app.get()
*/
