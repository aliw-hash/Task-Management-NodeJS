const { query } = require("express-validator");

const getTasksValidator = [
  query("limit", "limit must be a valid integer").isInt().toInt().optional(),
  query("page", "page must be a valid integer").isInt().toInt().optional(),
  query("order", "order must be in ['asc','dsc']").optional().isIn("asc","dsc"),
];

module.exports = getTasksValidator;