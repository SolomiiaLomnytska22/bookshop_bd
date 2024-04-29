var Authors = require("./Authors");
var Books = require("./Books");
var Books_Authors = require("./Books_Authors");
var Books_Genres = require("./Books_Genres");
var CustomerAddresses = require("./CustomerAddresses");
var Customers = require("./Customers");
var Employees = require("./Employees");
var Genres = require("./Genres");
var OrderItems = require("./OrderItems");
var Orders = require("./Orders");
var Positions = require("./Positions");
var PostServices = require("./PostServices");
var PublisherAddresses = require("./PublisherAddresses");
var Publishers = require("./Publishers");
var Reviews = require("./Reviews");
var Statuses = require("./Statuses");
var StorageBooks = require("./StorageBooks");
var UserLogins = require("./UserLogins");

Authors.belongsToMany(Books, { as: 'Books_ISBN_Books', through: Books_Authors, foreignKey: "Authors_AuthorID", otherKey: "Books_ISBN" });
Books.belongsToMany(Authors, { as: 'Authors_AuthorID_Authors', through: Books_Authors, foreignKey: "Books_ISBN", otherKey: "Authors_AuthorID" });
Books.belongsToMany(Genres, { as: 'Genres_GenreID_Genres', through: Books_Genres, foreignKey: "Books_ISBN", otherKey: "Genres_GenreID" });
Genres.belongsToMany(Books, { as: 'Books_ISBN_Books_Books_Genres', through: Books_Genres, foreignKey: "Genres_GenreID", otherKey: "Books_ISBN" });
Books_Authors.belongsTo(Authors, { as: "Authors_Author", foreignKey: "Authors_AuthorID"});
Authors.hasMany(Books_Authors, { as: "Books_Authors", foreignKey: "Authors_AuthorID"});
Books_Authors.belongsTo(Books, { as: "Books_ISBN_Book", foreignKey: "Books_ISBN"});
Books.hasMany(Books_Authors, { as: "Books_Authors", foreignKey: "Books_ISBN"});
Books_Genres.belongsTo(Books, { as: "Books_ISBN_Book", foreignKey: "Books_ISBN"});
Books.hasMany(Books_Genres, { as: "Books_Genres", foreignKey: "Books_ISBN"});
Reviews.belongsTo(Books, { as: "Book", foreignKey: "BookID"});
Books.hasMany(Reviews, { as: "Reviews", foreignKey: "BookID"});
StorageBooks.belongsTo(Books, { as: "ISBN_Book", foreignKey: "ISBN"});
Books.hasMany(StorageBooks, { as: "StorageBooks", foreignKey: "ISBN"});
CustomerAddresses.belongsTo(Customers, { as: "Customer", foreignKey: "CustomerID"});
Customers.hasOne(CustomerAddresses, { as: "CustomerAddresses", foreignKey: "CustomerID"});
Orders.belongsTo(Customers, { as: "Customer", foreignKey: "CustomerID"});
Customers.hasMany(Orders, { as: "Orders", foreignKey: "CustomerID"});
Reviews.belongsTo(Customers, { as: "Customer", foreignKey: "CustomerID"});
Customers.hasMany(Reviews, { as: "Reviews", foreignKey: "CustomerID"});
Books_Genres.belongsTo(Genres, { as: "Genres_Genre", foreignKey: "Genres_GenreID"});
Genres.hasMany(Books_Genres, { as: "Books_Genres", foreignKey: "Genres_GenreID"});
OrderItems.belongsTo(Orders, { as: "Order", foreignKey: "OrderID"});
Orders.hasMany(OrderItems, { as: "OrderItems", foreignKey: "OrderID"});
Employees.belongsTo(Positions, { as: "Position", foreignKey: "PositionID"});
Positions.hasMany(Employees, { as: "Employees", foreignKey: "PositionID"});
Orders.belongsTo(PostServices, { as: "PostService", foreignKey: "PostServiceID"});
PostServices.hasMany(Orders, { as: "Orders", foreignKey: "PostServiceID"});
Books.belongsTo(Publishers, { as: "Publisher", foreignKey: "PublisherID"});
Publishers.hasMany(Books, { as: "Books", foreignKey: "PublisherID"});
PublisherAddresses.belongsTo(Publishers, { as: "Publisher", foreignKey: "PublisherID"});
Publishers.hasOne(PublisherAddresses, { as: "PublisherAddresses", foreignKey: "PublisherID"});
Orders.belongsTo(Statuses, { as: "Status_Status", foreignKey: "Status"});
Statuses.hasMany(Orders, { as: "Orders", foreignKey: "Status"});
OrderItems.belongsTo(StorageBooks, { as: "StorageBook", foreignKey: "StorageBookID"});
StorageBooks.hasMany(OrderItems, { as: "OrderItems", foreignKey: "StorageBookID"});
Customers.belongsTo(UserLogins, { as: "Login", foreignKey: "LoginID"});
UserLogins.hasOne(Customers, { as: "Customers", foreignKey: "LoginID"});
Employees.belongsTo(UserLogins, { as: "Login", foreignKey: "LoginID"});
UserLogins.hasOne(Employees, { as: "Employees", foreignKey: "LoginID"});

module.exports = {
  Authors,
  Books,
  Books_Authors,
  Books_Genres,
  CustomerAddresses,
  Customers,
  Employees,
  Genres,
  OrderItems,
  Orders,
  Positions,
  PostServices,
  PublisherAddresses,
  Publishers,
  Reviews,
  Statuses,
  StorageBooks,
  UserLogins,
};

