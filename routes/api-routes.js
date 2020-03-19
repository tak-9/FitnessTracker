const db = require("../models");

module.exports = function (app) {

    app.get("/api/workouts", (req, res) => {
        console.log("get /api/workouts is called.");
        db.Workout.find({})
            .sort({day:'asc'})
            .then((dbResult) => {
                //console.log(dbResult);
                console.log("find ok");
                res.json(dbResult);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err);
            })
    });

    app.put("/api/workouts/:id", (req, res) => {
        console.log("*** put /api/workouts/:id is called", req.body);

        var now = new Date();

        // Mongodb find created results by date today
        // https://stackoverflow.com/questions/29327222/mongodb-find-created-results-by-date-today/29327353
        var todayStart = new Date();
        var todayEnd = new Date();
        todayStart.setHours(0,0,0,0);
        todayEnd.setHours(23,59,59,999)

        console.log("*** req.body ***",req.body);
        var tempJSON = {
            day: now,
            exercises: [{
                    type: req.body.type,
                    name: req.body.name,
                    duration: req.body.duration, 
                    distance: req.body.distance,
                    weight: req.body.weight,
                    reps: req.body.reps,
                    sets: req.body.sets
                }]
        };

        //console.log(tempJSON);

        // UPDATE workout WHERE day is between todayStart and todayEnd SET day=now AND push new exercise to array
        // IF there is no entry for today, INSERT the tempJSON. {upsert:true}
        db.Workout.findOneAndUpdate(
            { day: {$gt: todayStart, $lt: todayEnd} },
            { day:now , $push: { exercises :tempJSON.exercises}},
            { upsert: true , runValidators: true }
            )
        .then((dbResult) => {
            console.log("*** findOneAndUpdate:", dbResult);
            res.json(dbResult);
        })
        .catch(err => {
            console.log("*** error ***",err);
            res.status(500).json(err)
        });



    });

    app.post("/api/workouts", (req, res) => {
        console.log("post /api/workouts is called", req.body);
    });

    app.get("/api/workouts/range", (req, res) => {
        console.log("get /api/workouts/range is called");
        db.Workout.find({})
            .then((dbResult) => {
                //console.log(dbResult);
                //console.log("xxx",dbResult[dbResult.length-1]);
                console.log("find ok");
                res.json(dbResult);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json(err);
            })
    });
}