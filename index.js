const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 5000
var mysql = require('mysql');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, x-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methonds",
    "GET, POST, PUT, DELETE",
  );
  next();
})
app.use(express.json())

var con = mysql.createConnection({
  host: "korawit.ddns.net",
  user: "webapp",
  password: "secret2024",
  port: "3307",
  database: "shop"
});

con.connect(function (err) {
  if (err) throw err;
});

/* const products = [
  { id: 0, name: "Notebook Acer Swift", price: 45900, img: "https://img.advice.co.th/images_nas/pic_product4/A0147295/A0147295_s.jpg" },
  { id: 1, name: "Notebook Asus Vivo", price: 19900, img: "https://img.advice.co.th/images_nas/pic_product4/A0146010/A0146010_s.jpg" },
  { id: 2, name: "Notebook Lenovo Ideapad", price: 32900, img: "https://img.advice.co.th/images_nas/pic_product4/A0149009/A0149009_s.jpg" },
  { id: 3, name: "Notebook MSI Prestige", price: 54900, img: "https://img.advice.co.th/images_nas/pic_product4/A0149954/A0149954_s.jpg" },
  { id: 4, name: "Notebook DELL XPS", price: 99900, img: "https://img.advice.co.th/images_nas/pic_product4/A0146335/A0146335_s.jpg" },
  { id: 5, name: "Notebook HP Envy", price: 46900, img: "https://img.advice.co.th/images_nas/pic_product4/A0145712/A0145712_s.jpg" }
  ];
 */

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/products', (req, res) => {
  con.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw res.status(400).send('Not found any products');
    console.log(result);
    res.send(result);
  });
  /* if(products.length > 0)
    res.send(products);
  else
    res.status(400).send("No products founds"); */
});

app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  con.query("SELECT * FROM products where id=" + id, function (err, result, fields) {
    if (err) throw err;
    let product = result;
    if (product.length > 0) {
      res.send(product);
    }else{
      res.status(400).send('Not found product for' + id);
    }
  });

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})