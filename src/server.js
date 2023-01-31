const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const app = express();
const port = 3333;

app.use(express.json())
app.use(routes);
app.use(cors());

app.get("/", (request, response) =>{
    response.redirect(`http://localhost:${port}/status`);
});

app.get("/status", (request, response) =>{
    return response.json("Running");
});

app.listen(3333, ()=> console.log(
    `Starting server at http://localhost:${port}/
    Quit the server with CTRL-BREAK.
    `
));