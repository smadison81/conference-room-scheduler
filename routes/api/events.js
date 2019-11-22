const router = require("express").Router();
const events = require("../../controllers/eventsController");

// Matches with "/api/events"
router.route("/")
    .get((req, res) => { // get ALL events events from database
        events.findAll()
            .then((data) => {
                res.send(data)
            })
            .catch(err => res.status(422).json(err));
    })
    .post((req, res) => { // add ONE events event to database
        events.create(req.body)
            .then((data) => {
                res.send(data)
            })
            .catch(err => res.status(422).json(err));
    });


// Matches with "/api/events/:id"
router
    .route("/:id")
    .get((req, res) => { // get ONE events event from database
        events.findById(req.params.id)
            .then((data) => {
                res.send(data)
            })
            .catch(err => res.status(422).json(err));
    })
    .put((req, res) => { // update ONE events event from database
        events.updateOne(req.params.id, req.body)
            .then((data) => {
                res.send(data)
            })
            .catch(err => res.status(422).json(err));
    })
    .delete((req, res) => { // delete ONE events event from database
        events.deleteOne(req.params.id)
            .then((data) => {
                res.send(data)
            })
            .catch(err => res.status(422).json(err));
    });

module.exports = router;