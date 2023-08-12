const router = require("express").Router();
const { Blog, User, Comment } = require("../models"); // change project and user
const withAuth = require("../utils/auth");

// --------------------------- GET All Router -------------------------------- //
router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    // serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // pass serialized data and session flag into template
    res.render("dashboard", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// --------------------------- GET one by ID Router -------------------------------- //
router.get("/blog/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    if (!blogData) {
      res.status(404).json("No blog found with this ID!");
      return;
    }
    const blog = blogData.get({ plain: true });

    res.render("blog", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------- Use withAuth middleware to prevent access to route -------------------------------- //
router.get("/profile", withAuth, async (req, res) => {
  try {
    // find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------- Login -------------------------------- //

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.loggedIn) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// --------------------------- Sign Up -------------------------------- //

router.get("/signup", (req, res) => {
  if (req.session.signedUp) {
    res.redirect("/profile");
    return;
  }

  res.render("signup");
});

module.exports = router;
