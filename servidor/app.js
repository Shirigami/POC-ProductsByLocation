var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

var MongoClient = require('mongodb').MongoClient,
test = require('assert');
var url = 'mongodb://localhost:27017/SMKMdb';

app.post("/getProducts",function(req,res){
  var caracterres = {
    'é' : 'e',
    'í' : 'i',
    'ó' : 'o',
    'á' : 'a'
  }
  let nombreProvincia = "";
  for (var i = 0; i < req.body.name.length; i++) {
      let c = req.body.name[i];
      if (caracterres[c]) {
        nombreProvincia += caracterres[c];
        console.log(caracterres[c]);
        console.log(nombreProvincia[i]);
      }else {
        nombreProvincia += c;
      }
  }

  MongoClient.connect(url, function(err, db) {
      var col = db.collection('provincias');
      col.find({}).toArray(function(err, items) {
        if (err) {
          console.log(' Error:', err);
        } else {
        //console.log(items);
        }
        let productos = [];

        for (let item of items){
          let provincia = item.name;

          if (nombreProvincia.includes(provincia)) {
            productos = item.productos;
            break;
          }
        }
        console.log(productos);
        res.send(productos);

        db.close();
      });
    });

});
app.listen(3099,function(){
    console.log("working");
});
