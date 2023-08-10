// all of these are rendering, not accepting any inputs (res.render)
// NEVER should be creating anything in your database

// route to SignUp page
// route for Login page
// route for Dashboard page (Your Page) - req auth
// route for Home page (Feed)
// route for viewing a single blogpost and comments
// route to create a new blogpost - req auth
// route to update a blogpost **this is not the same as line 8 (// route for viewing a single blogpost and comments)

//

const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
