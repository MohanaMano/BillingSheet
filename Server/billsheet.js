const express = require('express')
const app = express()
const port = 8080
const cors = require('cors');
app.use(cors({
  origin: '*'
}));

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


const mongoose = require('mongoose')
//const url = `mongodb+srv://sample_user:<password>@my-sample-cluster-b3ugy.mongodb.net/<dbname>?retryWrites=true&w=majority`;

const url = `mongodb+srv://mohana:cbgleOB5gAI14mwn@cluster0.pm7hs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const connectionParams={
 useNewUrlParser: true, 
 useUnifiedTopology: true
} 
mongoose.connect(url,connectionParams) 
.then( () => {
   console.log('Connected to database ') 
 }) 
.catch( (err) => {
 console.error(`Error connecting to the database. \n${err}`); 
})

app.get('/allitems', (req, res) => {
  res.end('Hpaani!');
});

 app.get('/getbill', (req, res) => {
  var id = req.query.id;
  var pid = req.query.pode;

  res.json( [{"id":1,"productname":"Muffin Batt - Ban Dream Zero","productprice":68,"productquantity":16},
    {"id":2,"productname":"Dill Weed - Dry","productprice":36,"productquantity":87},
    {"id":3,"productname":"Beef - Tongue, Cooked","productprice":79,"productquantity":63},
    {"id":4,"productname":"Soupfoamcont12oz 112con","productprice":96,"productquantity":59},
    {"id":5,"productname":"Vaccum Bag - 14x20","productprice":64,"productquantity":54},
    {"id":6,"productname":"Mushroom - Lg - Cello","productprice":45,"productquantity":1},
    {"id":7,"productname":"Sesame Seed","productprice":37,"productquantity":26},
    {"id":8,"productname":"Allspice - Jamaican","productprice":30,"productquantity":92},
    {"id":9,"productname":"Beans - Yellow","productprice":47,"productquantity":46},
    {"id":10,"productname":"Muffin Mix - Morning Glory","productprice":88,"productquantity":42},
    {"id":11,"productname":"Lamb Rack Frenched Australian","productprice":83,"productquantity":51},
    {"id":12,"productname":"Beer - Muskoka Cream Ale","productprice":66,"productquantity":64},
    {"id":13,"productname":"Oil - Peanut","productprice":12,"productquantity":27},
    {"id":14,"productname":"Filo Dough","productprice":72,"productquantity":2},
    {"id":15,"productname":"Wine - Barbera Alba Doc 2001","productprice":52,"productquantity":2},
    {"id":16,"productname":"Cake - Cake Sheet Macaroon","productprice":53,"productquantity":52},
    {"id":17,"productname":"Nantucket Pine Orangebanana","productprice":98,"productquantity":75},
    {"id":18,"productname":"Mcguinness - Blue Curacao","productprice":65,"productquantity":31},
    {"id":19,"productname":"Calypso - Strawberry Lemonade","productprice":49,"productquantity":61},
    {"id":20,"productname":"Veal Inside - Provimi","productprice":51,"productquantity":38},
    {"id":21,"productname":"Beef Flat Iron Steak","productprice":29,"productquantity":44},
    {"id":22,"productname":"Steel Wool","productprice":29,"productquantity":99},
    {"id":23,"productname":"Wine - Red, Concha Y Toro","productprice":2,"productquantity":37},
    {"id":24,"productname":"Beer - Tetleys","productprice":39,"productquantity":58},
    {"id":25,"productname":"Salsify, Organic","productprice":56,"productquantity":9},
    {"id":26,"productname":"Appetizer - Assorted Box","productprice":46,"productquantity":30},
    {"id":27,"productname":"Bread - Petit Baguette","productprice":93,"productquantity":10},
    {"id":28,"productname":"Melon - Watermelon, Seedless","productprice":22,"productquantity":2},
    {"id":29,"productname":"Puff Pastry - Sheets","productprice":97,"productquantity":22},
    {"id":30,"productname":"Spaghetti Squash","productprice":48,"productquantity":12},
    {"id":31,"productname":"Pur Source","productprice":61,"productquantity":33},
    {"id":32,"productname":"Canadian Emmenthal","productprice":59,"productquantity":68},
    {"id":33,"productname":"Muffin - Zero Transfat","productprice":78,"productquantity":77},
    {"id":34,"productname":"Steampan - Half Size Shallow","productprice":89,"productquantity":7},
    {"id":35,"productname":"Ice Cream Bar - Oreo Cone","productprice":61,"productquantity":36},
    {"id":36,"productname":"Sun - Dried Tomatoes","productprice":81,"productquantity":59},
    {"id":37,"productname":"Coffee Cup 12oz 5342cd","productprice":81,"productquantity":74},
    {"id":38,"productname":"Cheese Cloth No 100","productprice":94,"productquantity":87},
    {"id":39,"productname":"Sauce - Hollandaise","productprice":48,"productquantity":20},
    {"id":40,"productname":"Lemon Grass","productprice":1,"productquantity":97},
    {"id":41,"productname":"Gatorade - Fruit Punch","productprice":43,"productquantity":91},
    {"id":42,"productname":"Dc Hikiage Hira Huba","productprice":6,"productquantity":78},
    {"id":43,"productname":"Wine - Red, Mosaic Zweigelt","productprice":9,"productquantity":27},
    {"id":44,"productname":"Grapes - Green","productprice":36,"productquantity":11},
    {"id":45,"productname":"Chip - Potato Dill Pickle","productprice":69,"productquantity":14},
    {"id":46,"productname":"Puree - Passion Fruit","productprice":85,"productquantity":84},
    {"id":47,"productname":"Wine - Redchard Merritt","productprice":77,"productquantity":66},
    {"id":48,"productname":"Beef - Sushi Flat Iron Steak","productprice":10,"productquantity":37},
    {"id":49,"productname":"Bandage - Finger Cots","productprice":96,"productquantity":69}]);
console.log('id:'+id);
 // res.end(pid+'   '+id+'priya!');

});


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
});
