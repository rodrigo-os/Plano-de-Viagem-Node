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

// Read
router.get("/travels", (request, response) =>{
    database.find({ }, (err, docs) =>{
        return err?console.log(err):response.status(200).json(docs);
    });
});

// Update
router.put("/travel", (request, response) =>{
    const _id = request.body._id;
    const travel = {
        from:{
            city:request.body.from.city,
            state:request.body.from.state,
        },
        to:{
            city:request.body.to.city,
            state:request.body.to.state,
        },
        travel_duration:request.body.travel_duration,
        travel_distance:request.body.travel_distance,
    };
    return !_id
        ? response.status(400).json("Identificador não informado!")
        : database.findOne({_id}, (err,doc) =>{
            !doc
                ? response.status(404).json("O Identificador informado não foi encontrado!")
                : database.update({_id}, {travel}, {}, (err) =>{
                    return err?console.log(err):response.status(201).json(travel);
                })
        })
});

module.exports = router;