const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const corsOrigin ={
    origin:'http://localhost:8080',
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));

const sequelize = require("./config/db.js");
const cookieParser = require('cookie-parser');
const verifyJWT = require('./bookshop_middleware/VerifyJWT');


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const loginRouter = require('./bookshop_routes/Login.js');
app.use('/login', loginRouter);

const logoutRouter = require('./bookshop_routes/Logout.js');
app.use('/logout', logoutRouter);

const registerRouter = require('./bookshop_routes/Register.js');
app.use('/register', registerRouter);

const refreshRouter = require('./bookshop_routes/RefreshToken.js');
app.use('/refresh', refreshRouter);

const statsRouter = require('./bookshop_routes/Stats.js');
app.use('/stats', statsRouter);

app.use(verifyJWT);

const booksRouter = require("./bookshop_routes/Books.js");
const authorsRouter = require("./bookshop_routes/Authors.js");
const booksAuthorsRouter = require("./bookshop_routes/Books_Authors.js");
const booksGenresRouter = require("./bookshop_routes/Books_Genres.js");
const customersRouter = require("./bookshop_routes/Customers.js");
const customerAddressesRouter = require("./bookshop_routes/CustomerAddresses.js");
const employeesRouter = require("./bookshop_routes/Employees.js");
const genresRouter = require("./bookshop_routes/Genres.js");
const orderItemsRouter = require("./bookshop_routes/OrderItems.js");
const ordersRouter = require("./bookshop_routes/Orders.js");
const positionsRouter = require("./bookshop_routes/Positions.js");
const postServicesRouter = require("./bookshop_routes/PostServices.js");
const publisherAddressesRouter = require("./bookshop_routes/PublisherAddresses.js");
const publishersRouter = require("./bookshop_routes/Publishers.js");
const reviewsRouter = require("./bookshop_routes/Reviews.js");
const statusesRouter = require("./bookshop_routes/Statuses.js");
const storageBooksRouter = require("./bookshop_routes/StorageBooks.js");
const userLoginsRouter = require("./bookshop_routes/UserLogins.js");

sequelize.sync();

app.use("/books", booksRouter);
app.use("/authors", authorsRouter);
app.use("/booksAuthors", booksAuthorsRouter);
app.use("/booksGenres", booksGenresRouter);
app.use("/customers", customersRouter);
app.use("/customerAddresses", customerAddressesRouter);
app.use("/employees", employeesRouter);
app.use("/genres", genresRouter);
app.use("/orderItems", orderItemsRouter);
app.use("/orders", ordersRouter);
app.use("/positions", positionsRouter);
app.use("/postServices", postServicesRouter);
app.use("/publisherAddresses", publisherAddressesRouter);
app.use("/publishers", publishersRouter);
app.use("/reviews", reviewsRouter);
app.use("/statuses", statusesRouter);
app.use("/storageBooks", storageBooksRouter);
app.use("/userLogins", userLoginsRouter);

module.exports = app;

