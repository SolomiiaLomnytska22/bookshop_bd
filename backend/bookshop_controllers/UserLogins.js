const { UserLogins } = require("../bookshop_models/");

exports.getAllUserLogins = async (req, res) => {
  try {
    const userLogins = await UserLogins.findAll();

    const responseBody = userLogins.map((login) => ({
      LoginID: login.LoginID,
      Username: login.Username,
      PasswordHash: login.PasswordHash,
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

exports.createUserLogin = async (req, res) => {
  try {
    console.log("Creating a new user login");
    console.log(req.body);
    const { Username, PasswordHash } = req.body;
    if (!Username || !PasswordHash) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const newUserLogin = await UserLogins.create({
      Username,
      PasswordHash,
    });

    res.status(201).json(newUserLogin);
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
};

exports.deleteUserLogin = async (req, res) => {
  try {
    const loginId = req.params.id;
    console.log(loginId);
    const userLogin = await UserLogins.findByPk(loginId);

    await userLogin.destroy();

    return res.status(204).json("Successfully deleted");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUserLogin = async (req, res) => {
  try {
    const loginId = req.params.id;
    const { Username, PasswordHash } = req.body;

    const userLogin = await UserLogins.findByPk(loginId);

    userLogin.Username = Username;
    userLogin.PasswordHash = PasswordHash;

    await userLogin.save();

    return res.status(200).json(userLogin);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
