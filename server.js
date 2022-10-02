const express = require("express");
const memberRoutes = require("./api/routes/memberRoutes");
const app = express();

app.use(express.json())
memberRoutes(app);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});