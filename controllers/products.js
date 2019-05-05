const Products = require("../model/products");


exports.GetAddProducts =  (req, res, next)=>
{
    res.render("shop", {
        path: "/",
        prods: Products.fetchAll()
    });
}





