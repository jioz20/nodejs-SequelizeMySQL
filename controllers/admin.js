/// Admin
const Products = require("../model/products");
const User = require("../model/user");

exports.GetAdminProducts = (req, res, next)=>{
    res.render("admin/addProduct", {
        path: "/admin/addproduct"
    });
}

exports.PostAdminProducts = (req, res, next)=>
{

    const {title, price, images, description} = req.body;

    //Tu khoi tao ham createProduct
    req.user.createProduct({
        title: title,
        price: price,
        imageUrl: images,
        description: description
    })
    .then(() => {
        res.redirect("/");
    })
    .catch(err => console.log(err))
}


exports.ListProductsAdmin = (req, res, next) =>
{
    // Products.findAll()
    req.user.getProducts()
    .then(products => 
    {
        res.render("admin/products", 
        {
            prods: products,
            path: "/admin/products"
        })
    })
    .catch(err => console.log(err))
}


exports.EditProduct = (req, res, next)=>{

    //Tu khoi tao ham createProduct

    // Products.findByPk(req.params.id)
    
    req.user.getProducts({where: {id: req.params.id}})
    .then(products =>{
        const product = products[0];
        if(!product)
            res.redirect("/");
        else
            res.render("admin/editProduct", {
                path: "/amin/edit-product",
                product: product
            })
    })
    .catch(err => console.log(err))
}


exports.PostEditProduct = (req, res, next) => {
    const {title, price, images, description, id} = req.body;
    Products.findByPk(id)
    .then(
        product => {
            product.title = title;
            product.price = price;
            product.imageUrl = images;
            product.description = description;
            return product.save();
        },  res.redirect("/"))
    .catch(err => console.log(err))
}


exports.DeleteProduct = (req, res, next) => {
    Products.findByPk(req.params.id)
    .then(product => {
        product.destroy();
        // console.log(product);
    },
    res.redirect("/admin/products"))
    .catch(err => console.log(err)) 
}