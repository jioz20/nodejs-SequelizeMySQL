const Products = require("../model/products");

exports.getProducts = (req, res, next)=>{

    Products.findAll()
    .then(product => {
        res.render("shop/product-list", {
            prods: product,
            path: "/product-list"
        })
    })
    .catch(err => console.log(err));
}


//Lay 1 san pham
exports.getProduct = (req, res, next)=>
{
    Products.findByPk(req.params.id)

   .then(products => {
       res.render('shop/product-detail', {
           product: products,
           path: "/product-detail"
       })

   })
   .catch(err => console.log(err))
}


exports.getIndex = (req, res, next) =>{
    Products.findAll()
    .then(product => {
        res.render("shop/index", {
            prods: product,
            path: "/"
        })
    })
    .catch(err => console.log(err));
}




//Get Card
exports.getCart = (req, res, next) => {
    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
        .then(products => {
            res.render("shop/cart", {
                path: "/cart",
                products : products
            })
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err))
}


//Post Card
exports.PostCart = (req, res, next) => {
    let fetchedCart;
    let product;
    let newQuantity = 1;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where: {id: req.body.id}});
    })
    .then(products => {

        if(products.length > 0)
            product = products[0];        
        
        if(product)
        {
            let oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }
        return Products.findByPk(req.body.id);
    })

    .then(product => {
        return fetchedCart.addProduct(product, { through : { quantity: newQuantity}});
    })
    .then(() => {
        res.redirect("/cart");
    })
    .catch(err => console.log(err));
}



//Delete Card
exports.getCartDeleteProduct = (req, res, next) => 
{
    req.user
    .getCart()
    .then(cart => {
        return cart.getProducts({where: {id: req.params.id}});
    })
    .then(products => {
        const product = products[0];
        product.cartItem.destroy();
    })
    .then(result => {
        res.redirect("/cart");
    })
    .catch(err => console.log(err))
}


//Orders
exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    })
    .then(products => {
        return req.user.createOrder()
        .then(order => {
            return order.addProducts(products.map(product => {
                product.orderItem = {quantity: product.cartItem.quantity}
                return product;
            }));
        })
        .catch(err => console.log(err))
    })
    .then(result => {
        fetchedCart.setProducts(null);
        
    })
    .then(result => {
        res.redirect("/order");
    })
    .catch(err => console.log(err))
}


exports.getOrders = (req, res, next) => {
    req.user.getOrders({require: ['products']})
    .then(orders => {
        console.log(orders);
        res.render("shop/order", {
            path: "/order",
            orders: orders
        })
    })
    .catch(err => console.log(err))
    
}