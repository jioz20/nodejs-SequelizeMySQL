const express = require("express");
const bodyParser = require("body-parser");
const shopRoutes = require("./routes/shop");
const adminRoutes = require("./routes/admin");
const app = express();
const sequelize = require("./util/database");
const Product = require("./model/products");
const User = require("./model/user");
const Cart = require("./model/cart");
const CartItem = require("./model/card-item");
const Order = require("./model/order");
const OrderItem = require("./model/order-item");

const errorController = require("./controllers/error");

app.set("views", "./views");
app.set("view engine", "ejs");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next)=>{
    User.findByPk(1)
    .then(user =>
    { 
        req.user = user;
        next();
    })
    .catch(err => console.log(err))
})

app.use("/", shopRoutes);
app.use("/admin", adminRoutes);



app.use(errorController.Get404);


//Nhieu san pham thuoc 1 user (n - 1)
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});

//1 user co nhieu san pham (1 -n)
User.hasMany(Product);



//
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});




sequelize
// .sync({force: true}) //Cai nay de thuc hien voi database, setup du lieu
.sync() //Cai nay thi khong
.then(result => {
    return User.findByPk(1)
})
.then(user => {
    if(!user)
    {
        return User.create({name: "Nguyen", email: "7264@gmail.com"});
    }
    return user;
})
.then(user => {
    return user.createCart();
})
.catch()

const port = process.env.PORT || 3000;
app.listen(port);
