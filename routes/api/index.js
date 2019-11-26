const router = require("express").Router();
const eventsRoutes = require("./events");

// Book routes
router.use("/events", eventsRoutes);

module.exports = router;
