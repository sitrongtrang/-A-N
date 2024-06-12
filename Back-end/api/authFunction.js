const router = require("express").Router();
const crypto = require("crypto");
const { Client } = require("pg");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const createSecretToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
const hashpass = (password) => {
  const hash = crypto.createHash("sha256");

  // Update the hash with the password
  hash.update(password);

  // Convert the hash to a hexadecimal string and return it
  return hash.digest("hex");
};
const client1 = new Client({
  connectionString:
    "postgres://yolohomiedata_user:dOzsLSGsIjpn6ETiRUz3hJZeV70KxxoD@dpg-con3gmocmk4c739u2gjg-a.singapore-postgres.render.com/yolohomiedata",
  ssl: { rejectUnauthorized: false },
});
client1
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) =>
    console.error("Error connecting to PostgreSQL database", err)
  );
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedpass = hashpass(password);
    const result = await client1.query(
      "SELECT username,email,password FROM yolohome_user WHERE email = $1 AND password = $2",
      [email, hashedpass]
    );
    const token = createSecretToken(result.rows[0].email);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    console.log(result.rows);
    if (result.rows != 0) {
      res.status(200).json({
        message: "Successfully logged in",
        success: true,
        token: token,
        username: result.rows[0].username,
      });
    } else {
      res.json({ message: "Wrong username or password" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/info/:username", async (req, res) => {
  const { username } = req.params;
  console.log(username);
  try {
    const result = await client1.query(
      "SELECT username,email FROM yolohome_user WHERE username = $1",
      [username]
    );
    console.log(result.rows);
    res
      .status(200)
      .json({ username: result.rows[0].username, email: result.rows[0].email });
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = router;
