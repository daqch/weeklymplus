const router = require("express").Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT user_name from users WHERE user_id=$1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});

router.get("/chars", authorization, async (req, res) => {
  try {
    const chars = await pool.query(
      "SELECT name,ream from char_membership WHERE user_id=$1",
      [req.user]
    );
    res.json(chars);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("server error");
  }
});

router.post("/addChar", authorization, async (req, res) => {
  try {
    const { char_name, realm } = req.body;
    console.log(req.body);
    const char = await pool.query(
      "SELECT * FROM char_membership WHERE user_id = $1 AND ream = $2 AND name = $3",
      [req.user, realm, char_name]
    );

    if (char.rows.length !== 0) {
      return res.status(401).send({ msg: "already existent" });
    }

    const newChar = await pool.query(
      "INSERT INTO char_membership (user_id, name, ream) VALUES ($1, $2, $3) RETURNING *",
      [req.user, char_name, realm]
    );

    res.json(newChar.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/removeChar", authorization, async (req, res) => {
  try {
    const { name, ream } = req.body;
    const char = await pool.query(
      "SELECT * FROM char_membership WHERE user_id = $1 AND ream = $2 AND name = $3",
      [req.user, ream, name]
    );

    if (char.rows.length == 0) {
      return res.status(401).send({ msg: "non-existent character" });
    }

    const removedChar = await pool.query(
      "DELETE FROM char_membership WHERE user_id = $1 AND ream = $2 AND name = $3 RETURNING *",
      [req.user, ream, name]
    );

    res.json(removedChar);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
