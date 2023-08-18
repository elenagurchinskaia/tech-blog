const router = require("express").Router();
const session = require("express-session");
const { User } = require("../../models");
const bcrypt = require("bcrypt");

// --------------------------- Signup -------------------------------- //
router.post("/", async (req, res) => {
  try {
    // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
      // password: hashedPassword,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.logged_in = true;
    });

    res.status(201).json({
      newUser,
      message: "User signed up and logged in",
    });
  } catch (err) {
    // res.status(500).json({ message: "An error occurred" });
  }
});
// --------------------------- Login -------------------------------- //
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    // console.log("Login route reached");
    // console.log("userData:", userData);

    if (!userData) {
      return res.status(400).json({ message: "Invalid username." });
    }
    // const user =
    // const validPassword = await bcrypt.compare(
    //   req.body.password,
    //   userData.password
    // );

    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // req.session.user_id = userData.id;
    // req.session.logged_in = true;

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      res.status(200).json({
        userData,
        message: "User logged in successfully",
      });
    });
  } catch (err) {
    res.status(500).json({ message: "An error occurred" });
  }
});
// --------------------------- Logout -------------------------------- //
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
