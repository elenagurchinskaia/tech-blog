const router = require("express").Router();
const { Blog, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

// --------------------------- GET All -------------------------------- //

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", { blogs, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});
// --------------------------- GET one by ID -------------------------------- //
router.get("/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
    });

    if (!blogData) {
      res.status(404).json({ message: "No blog found with this ID!" });
      return;
    }

    const blog = blogData.get({ plain: true });

    res.render("singleBlog", {
      blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------- POST Router -------------------------------- //
router.post("/", withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// --------------------------- PUT Route -------------------------------- //

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedBlog = await Blog.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!updatedBlog[0]) {
      res.status(404).json({ message: "No blog found with this ID!" });
      return;
    }

    res.status(200).json({ message: "Blog post updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// --------------------------- DELETE one by ID Router -------------------------------- //
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
