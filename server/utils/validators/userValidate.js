const { check } = require("express-validator");
const validatorHandler = require("../../middlewares/validatorHandler");

exports.createNewUserValidator = [
  check("name")
    .notEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string")
    .trim()
    .escape(),
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .trim()
    .isEmail()
    .withMessage("invalid email")
    .normalizeEmail()
    .escape(),
  check("phoneNumber")
    .notEmpty()
    .withMessage("phone number is required")
    .isMobilePhone()
    .withMessage("invalid phone number")
    .trim()
    .escape(),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string")
    .trim()
    .escape(),
  validatorHandler,
];

exports.loginUserValidator = [
  check("email")
    .notEmpty()
    .withMessage("email is required")
    .trim()
    .isEmail()
    .withMessage("invalid email")
    .normalizeEmail()
    .escape(),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isString()
    .withMessage("password must be a string")
    .trim()
    .escape(),
  validatorHandler,
];
