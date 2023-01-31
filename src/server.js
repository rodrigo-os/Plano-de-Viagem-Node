const express = require("express");

const app = express();
const port = 3333;

app.use(express.json());

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