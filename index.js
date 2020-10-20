const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//authentication//
app.use("/auth", require("./routes/auth"));

//dashboard//
app.use("/dashboard", require("./routes/dashboard"));

app.listen(process.env.PORT || 5000, () => {
  console.log("server is running on port 5000");
});
