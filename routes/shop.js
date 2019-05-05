const router = require("express").Router();
const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/product-list", shopController.getProducts);

router.get("/product-detail/:id", shopController.getProduct);

router.get("/cart", shopController.getCart);

router.post("/postcard", shopController.PostCart);

router.get("/getCartDeleteProduct/:id", shopController.getCartDeleteProduct)

router.get("/order", shopController.getOrders);

router.post("/create-order", shopController.postOrder);

module.exports = router;