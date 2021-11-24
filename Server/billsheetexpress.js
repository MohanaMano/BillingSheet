const express = require('express')
const mongodb = require('mongodb')
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

/* Get list of bills */
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

/* Insert an item to bills */
app.post('/insertbill', (req, res) => {
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

/* Insert an item to bills */
app.delete('/deletebill', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("billingsystem");
    dbo.collection("bill").deleteOne({_id: new mongodb.ObjectID(req.query.id)}, function(err, result) {
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

/* Update item to bills */
app.patch('/updatebill', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("billingsystem");
    //FIXME: req.query.id
    var query = {_id: new mongodb.ObjectID(req.query.id)}
    var myobj = {$set:{ productname: req.query.productname, productprice:req.query.productprice,productquantity:req.query.productquantity }};
    dbo.collection("bill").updateOne(query, myobj, function(err, result) {
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

/* Insert an item to budget */
app.post('/addbudget', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("billingsystem");
    var myobj = { budget: req.query.budget};
    dbo.collection("budget").insertOne(myobj, function(err, result) {
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

/* Insert an item to expense */
app.post('/addexpense', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("billingsystem");
    var myobj = { productname: req.query.productname, productprice:req.query.productprice };
    dbo.collection("expense").insertOne(myobj, function(err, result) {
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

/* Get list of budget */
app.get('/getbudget', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("billingsystem");
    dbo.collection("budget").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
  });
});

/* Get list of expense */
app.get('/getexpense', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("billingsystem");
    dbo.collection("expense").find({}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.json(result);
      db.close();
    });
  });
});

/* Insert an item in expense */
app.delete('/deleteexpense', (req, res) => {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("billingsystem");
    dbo.collection("expense").deleteOne({_id: new mongodb.ObjectID(req.query.id)}, function(err, result) {
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
