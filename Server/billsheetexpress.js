const express = require('express')
const app = express()
const port = 8080
const cors = require('cors');
app.use(cors({
  origin: '*'
}));

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT']
}));


const url = `mongodb+srv://mohana:cbgleOB5gAI14mwn@cluster0.pm7hs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
var MongoClient = require('mongodb').MongoClient;

const connectionParams={
 useNewUrlParser: true, 
 useUnifiedTopology: true
} 

app.get('/getbill', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("billingsystem");
    dbo.collection("bill").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
  });
});
app.post('/insertbill', (req, res) => {
  console.log("Balaji");
    console.log(req.query.productname);
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("billingsystem");
    var myobj = { productname: req.query.productname, productprice:req.query.productprice,productquantity:req.query.productquantity };
    dbo.collection("bill").insertOne(myobj, function(err, result) {
      if (err)
      { 
        res.json({status:"Fail"});
      }

      else{
        res.json({status:"Success"});
      }
      db.close();

    });
  });
});  
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});
