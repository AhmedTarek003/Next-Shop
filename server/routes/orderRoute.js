const router = require("express").Router();
const {
  createOrderCtrl,
  getAllOrdersCtrl,
  getOrderCtrl,
  updateOrderStatusCtrl,
} = require("../controllers/orderCtrl");
const {
  verifyTokenWithUser,
  verifyTokenWithAdmin,
} = require("../middlewares/tokenHandler");
const validateObjId = require("../middlewares/validateObjId");
const {
  createOrderValidator,
  updateOrderStatusValidator,
} = require("../utils/validators/orderValidate");

router
  .route("/")
  .post(verifyTokenWithUser, createOrderValidator, createOrderCtrl)
  .get(verifyTokenWithAdmin, getAllOrdersCtrl);
router
  .route("/:id")
  .put(
    verifyTokenWithAdmin,
    validateObjId,
    updateOrderStatusValidator,
    updateOrderStatusCtrl
  );

module.exports = router;
