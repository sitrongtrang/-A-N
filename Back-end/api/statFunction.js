const router = require("express").Router();
const moment = require("moment");
const { Client } = require("pg");

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
router.get("/temp", async (req, res) => {
  try {
    const result = await client1.query(
      "SELECT time,temperature FROM tmp_li_humi ORDER BY time asc LIMIT 20"
    );
    for (let i = 0; i < result.rowCount; i++) {
      result.rows[i].time = moment(result.rows[i].time).format("hh:mm:ss");
    }
    res.json(result.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.get("/humid", async (req, res) => {
  try {
    const result = await client1.query(
      "SELECT time,humidity FROM tmp_li_humi ORDER BY time asc LIMIT 20 "
    );
    console.log("inside api humids");
    for (let i = 0; i < result.rowCount; i++) {
      result.rows[i].time = moment(result.rows[i].time).format("hh:mm:ss");
    }
    res.json(result.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.get("/uv", async (req, res) => {
  try {
    const result = await client1.query(
      "SELECT time,light FROM tmp_li_humi ORDER BY time asc LIMIT 20"
    );
    for (let i = 0; i < result.rowCount; i++) {
      result.rows[i].time = moment(result.rows[i].time).format("hh:mm:ss");
    }
    res.json(result.rows);
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.get("/waterpump/:name", async (req, res) => {
  const { name } = req.params;

  try {
    if (name && name == "all") {
      const result = await client1.query(
        "SELECT datetime,SUM(amount) FROM waterpump GROUP BY datetime ORDER BY datetime asc "
      );
      for (let i = 0; i < result.rowCount; i++) {
        result.rows[i].datetime = moment(result.rows[i].datetime).format(
          "DD-MM-YYYY hh:mm:ss"
        );
      }
      res.json(result.rows);
    } else if (name && name != "none") {
      const result = await client1.query(
        "SELECT datetime,amount,name FROM waterpump WHERE name LIKE $1 ORDER BY datetime asc ",
        [`${name}%`]
      );
      for (let i = 0; i < result.rowCount; i++) {
        result.rows[i].datetime = moment(result.rows[i].datetime).format(
          "DD-MM-YYYY hh:mm:ss"
        );
      }
      res.json(result.rows);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});
module.exports = router;
