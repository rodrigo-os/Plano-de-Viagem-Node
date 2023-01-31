const express = require("express");
const cors = require("cors");

const nedb = require("nedb");
const database = new nedb({
    filename: './database.db',
    autoload:true,
});

const router = express.Router();
router.use(cors());

// Create
router.post("/travel", (request, response) =>{
    const travel = request.body;
    database.insert(travel, (err)=>{
        return err?console.log(err):response.status(201).json(travel);
    });
});

module.exports = router;