const router = require("express").Router();
const fs = require("fs");
const status = JSON.parse(fs.readFileSync("statusfile.json"));
router.post("/lightControl", async (req, res) => {
  const { signal } = req.body;

  try {
    let light = parseInt(signal);
    console.log("I was here");
    if (light == 11) {
      status.light1 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2));
      res.json({ message: "Light 1 has turned on", light: 2 });
    } else if (light == 12) {
      status.light2 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 2 has turned on", light: 2 });
    } else if (light == 13) {
      status.light3 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 3 has turned on", light: 3 });
    } else if (light == 14) {
      status.light4 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 4 has turned on", light: 4 });
    } else if (light == 21) {
      status.light1 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 1 has turned off", light: 1 });
    } else if (light == 22) {
      status.light2 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 2 has turned off", light: 2 });
    } else if (light == 23) {
      status.light3 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 3 has turned off", light: 3 });
    } else if (light == 24) {
      status.light4 = light;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2)); // Write the updated status object to the file
      res.json({ message: "Light 4 has turned off", light: 4 });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get("/statusDevices", async (req, res) => {
  try {
    res.json(status);
  } catch (error) {
    res.json({ error: error.message });
  }
});
router.post("/sensorControl", async (req, res) => {
  const { data1, data2, data3 } = req.body;
  try {
    const data11 = parseInt(data1);
    const data12 = parseInt(data2);
    const data13 = parseInt(data3);
    if (data11 != 0) {
      status.temp = data11;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2));
      res.json({ message: "received temp sensor" });
    } else if (data12 != 0) {
      status.humid = data12;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2));
      res.json({ message: "received humidity sensor" });
    } else if (data13 != 0) {
      status.uv = data13;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2));
      res.json({ message: "received uv sensor" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/fanControl", async (req, res) => {
  const { signal } = req.body;
  try {
    fan = parseInt(signal);
    if (fan == 40) {
      status.fan = fan;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2));
      res.json({ message: "Fan has turned off  " });
    } else if (fan == 425) {
      status.fan = fan;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2));
      res.json({ message: "Fan has turned on at 25%" });
    } else if (fan == 450) {
      status.fan = fan;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2));
      res.json({ message: "Fan has turned on at 50%" });
    } else if (fan == 475) {
      status.fan = fan;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2));
      res.json({ message: "Fan has turned on at 75%" });
    } else if (fan == 4100) {
      status.fan = fan;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2));
      res.json({ message: "Fan has turned on at 100%" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/doorControl", async (req, res) => {
  const { signal } = req.body;
  try {
    door = parseInt(signal);
    if (door == 31) {
      status.door = door;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2));
      res.json({ message: "Door is closing" });
    } else if (door == 32) {
      status.door = door;
      fs.writeFileSync("statusfile.json", JSON.stringify(status, null, 2));
      res.json({ message: "Door is opening" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
