const { Employees } = require("../bookshop_models/");

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.findAll();

    const responseBody = employees.map((employee) => ({
      EmployeeID: employee.EmployeeID,
      LoginID: employee.LoginID,
      PositionID: employee.PositionID,
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      Email: employee.Email,
    }));

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      body: {
        status: "error",
        message: "Internal Server Error",
      },
    });
  }
};

exports.getEmployeeByID = async (req, res) => {
  try {
    const employeeId = req.params.id;
    console.log(`Getting employee with ID: ${employeeId}`);

    if (isNaN(employeeId)) {
      return res.status(400).json({
        error: "Invalid employee ID.",
      });
    }

    const employees = await Employees.findByPk(employeeId);

    if (!employees) {
      return res.status(404).json({
        error: "Employee not found.",
      });
    }
    const responseBody = employees.map((employee) => ({
      EmployeeID: employee.EmployeeID,
      LoginID: employee.LoginID,
      PositionID: employee.PositionID,
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      Email: employee.Email,
    }));

    res.status(200).json(responseBody);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    console.log("Creating a new employee");
    console.log(req.body);
    const { LoginID, PositionID, FirstName, LastName, Email } = req.body;
    if (!LoginID || !PositionID || !FirstName || !LastName || !Email) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const newEmployee = await Employees.create({
      LoginID,
      PositionID,
      FirstName,
      LastName,
      Email
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    console.log(employeeId);
    const employee = await Employees.findByPk(employeeId);

    await employee.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { LoginID, PositionID, FirstName, LastName, Email } = req.body;

    const employee = await Employees.findByPk(employeeId);

    employee.LoginID = LoginID;
    employee.PositionID = PositionID;
    employee.FirstName = FirstName;
    employee.LastName = LastName;
    employee.Email = Email;

    await employee.save();

    return res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
