const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserLogins } = require('../bookshop_models/');
const { Employees } = require('../bookshop_models/');
const { Positions } = require('../bookshop_models/');
require('dotenv').config();

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });

    try {
        // Check for duplicate usernames in the database
        const foundUser = await UserLogins.findOne({ where: { Username: username } });
        if (foundUser) return res.sendStatus(409); // Conflict 

        // Encrypt the password
        const hashedPwd = password

        // Store the new user
        const newUserLogin = await UserLogins.create({ Username: username, PasswordHash: hashedPwd });

        // Assuming Employees and Positions are your models for employee data
        let permission = 0;
        const employee = await Employees.findOne({ where: { LoginID: newUserLogin.LoginID } });
        if (employee) {
            const position = await Positions.findOne({ where: { PositionID: employee.PositionID } });
            if (position) permission = position.PermissionLevel;
        }

        // Create JWTs
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": newUserLogin.Username,
                    "permission_level": permission
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const refreshToken = jwt.sign(
            { "username": newUserLogin.Username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // Update refreshToken in the database
        await newUserLogin.update({ refreshToken });

        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        res.status(201).json({ accessToken });
    } catch (error) {
        console.error('Error occurred while handling registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { handleNewUser };
