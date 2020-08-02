const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validinfo");
const authorization = require("../middleware/authorization");
router.post("/register", validInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists!");
    }

    const saltBound = 10;

    const salt = await bcrypt.genSalt(saltBound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/login", validInfo, async (req, res) => {
  try {
    //1.
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM USERS WHERE user_email=$1", [
      email,
    ]);

    if (user.rows.length == 0) {
      return res.status(403).json("Email or password is incorrect");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(403).json("Password is incorrect!");
    }

    const jwtToken = jwtGenerator(user.rows[0].user_id);

    res.json({ jwtToken });
  } catch (error) {
    console.error(error.message);
    console.log("Server error!");
  }
});

module.exports = router;
