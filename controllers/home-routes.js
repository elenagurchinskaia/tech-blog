const router = require("express").Router();
const { Blog, User, Comment } = require("../models"); // change project and user
const withAuth = require("../utils/auth");

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
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
