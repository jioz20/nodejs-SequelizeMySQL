const router = require("express").Router();
const AdminController = require("../controllers/admin");

router.get("/addproduct", AdminController.GetAdminProducts);

router.post("/addproduct", AdminController.PostAdminProducts);

router.get("/products", AdminController.ListProductsAdmin);

router.get("/editproduct/:id", AdminController.EditProduct);

router.post("/editproduct", AdminController.PostEditProduct);

router.get("/deleteproduct/:id", AdminController.DeleteProduct);


module.exports = router;