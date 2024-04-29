const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserLogins } = require('../bookshop_models/');
const { Employees } = require('../bookshop_models/');
const { Positions } = require('../bookshop_models/');
require('dotenv').config();

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required.' });
    try {
        // Find the user in the database
        const foundUser = await UserLogins.findOne({ where: { Username: username } });
        if (!foundUser) return res.sendStatus(401); // Unauthorized
        
        if (password == foundUser.PasswordHash) {
            let permission
            let employee = await Employees.findOne({where: { LoginID: foundUser.LoginID }})
            if (employee){
                permission = await Positions.findOne({where: { PositionID: employee.PositionID }})?.PermissionLevel
            } else {
                permission = 0
            }
            // Create JWTs
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.Username,
                        "permission_level": permission
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            const refreshToken = jwt.sign(
                { "username": foundUser.Username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // Update refreshToken in the database
            await foundUser.update({ RefreshToken: refreshToken });

            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken });
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        console.error('Error occurred while handling login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { handleLogin };
