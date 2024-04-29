const express = require("express");
const router = express.Router();
const employeesController = require("../bookshop_controllers/Employees.js");

router.route("/").get(employeesController.getAllEmployees).post(employeesController.createEmployee);

router
  .route("/:id")
  .get(employeesController.getEmployeeByID)
  .delete(employeesController.deleteEmployee)
  .put(employeesController.updateEmployee);

module.exports = router;
