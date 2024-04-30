const mongoose = require("mongoose");
const app = require("./app");

const port = 3000;

mongoose.connect("mongodb+srv://solomiialomnytskapz2021:yE0wtyk8tld9NKUj@cluster0.oxdyu09.mongodb.net/Logger").then(() => {
  console.log("Db connection is successful");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
