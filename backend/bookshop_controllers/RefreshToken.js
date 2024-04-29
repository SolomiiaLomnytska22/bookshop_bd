const { UserLogins } = require('../bookshop_models/UserLogins');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = UserLogins.find(person => person.RefreshToken === refreshToken);
    if (!foundUser) return res.sendStatus(403); //Forbidden 

    let permission
    let employee = await Employees.findOne({where: { LoginID: foundUser.LoginID }})
    if (employee){
        permission = await Positions.findOne({where: { PositionID: employee.PositionID }})?.PermissionLevel
    } else {
        permission = 0
    }

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.Username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
            { 
                "UserInfo":
                {
                    "username": decoded.username,
                    "permission_level": permission
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300000s' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }