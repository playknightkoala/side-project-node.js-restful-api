const express = require("express");
const memberRoutes = require("./routes/memberRoutes");
const loginRoutes = require("./routes/loginRoutes");
const filter = require("./filter/filter");
const app = express();

app.use(filter);
app.use(express.json());
memberRoutes(app);
loginRoutes(app);

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
