const express = require("express");
const axios = require("axios");
const { url } = require("./link.js");

// const { publishMessage } = require("./mqttFunc/publisher");
const app = express();
const cors = require("cors");
require("dotenv").config();
const controlRoute = require("./api/controllFunction.js");
const statRoute = require("./api/statFunction.js");
const authRoute = require("./api/authFunction.js");
const mqtt = require("mqtt");
app.use(
  cors({
    origin: [
      "http://localhost:8000",
      "http://localhost:3000",
      "https://yolohomiebe.onrender.com",
    ],
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

const mqttOptions = {
  host: "mqtt.ohstem.vn",
  port: 1883,
  username: "thinhdadn",
  password: "hehe",
};
const client = mqtt.connect(mqttOptions);
client.on("connect", () => {
  //console.log("Connected to MQTT broker");
  const topics = [
    "thinhdadn/feeds/V2/humidity",
    "thinhdadn/feeds/V2/temperature",
    "thinhdadn/feeds/V2/sun",
    "thinhdadn/feeds/V2/door",
    "thinhdadn/feeds/V2/lights",
    "thinhdadn/feeds/V2/fan",
  ];

  client.subscribe(topics, (err) => {
    if (err) {
      console.error("Error subscribing to topics:", err);
    } else {
      //console.log("Subscribed to topics:", topics.join(", "));
    }
  });
});
client.on("message", (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
  // Check if the received topic is in the list of subscribed topics
  //   if (!topics1.includes(topic)) {
  //     console.log("Received message on unsubscribed topic:", topic);
  //     return;
  //   }
  switch (topic) {
    case "thinhdadn/feeds/V2/lights":
      // Handle messages for the "light" topic
      if (message.toString() === "11") {
        // Turn on a device or perform any other action
        utility("11");
      } else if (message.toString() === "12") {
        utility("12");
      } else if (message.toString() === "13") {
        utility("13");
      } else if (message.toString() === "14") {
        utility("14");
      } else if (message.toString() === "21") {
        utility("21");
      } else if (message.toString() === "22") {
        utility("22");
      } else if (message.toString() === "23") {
        utility("23");
      } else if (message.toString() === "24") {
        utility("24");
      } else {
        // Handle other message content
        console.log(
          "Received message with unrecognized content:",
          message.toString()
        );
      }
      break;
    case "thinhdadn/feeds/V2/temperature":
      // Handle messages for the "temperature" topic
      utility3(message.toString(), 0, 0);
      break;
    case "thinhdadn/feeds/V2/humidity":
      // Handle messages for the "humidity" topic
      utility3(0, message.toString(), 0);
      break;
    // Add cases for other topics as needed
    case "thinhdadn/feeds/V2/sun":
      utility3(0, 0, message.toString());
      break;

    case "thinhdadn/feeds/V2/door":
      if (message.toString() === "31") {
        // Turn on a device or perform any other action
        utility2("31");
      } else if (message.toString() === "32") {
        utility2("32");
      } else {
        console.log(
          "Received message with unrecognized content:",
          message.toString()
        );
      }
      break;

    case "thinhdadn/feeds/V2/fan":
      if (message.toString() === "40") {
        // Turn on a device or perform any other action
        utility1("40");
      } else if (message.toString() === "425") {
        utility1("425");
      } else if (message.toString() === "450") {
        utility1("450");
      } else if (message.toString() === "475") {
        utility1("475");
      } else if (message.toString() === "4100") {
        utility1("4100");
      } else {
        console.log(
          "Received message with unrecognized content:",
          message.toString()
        );
      }
      break;

    default:
      // Handle messages for unrecognized topics
      console.log("Received message on unrecognized topic:", topic);
      break;
  }
});
const utility = async (signal) => {
  try {
    console.log("helo");
    const response = await axios.post(`${url}/lightControl`, {
      signal: signal,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
};
const utility1 = async (signal) => {
  try {
    const response = await axios.post(`${url}/fanControl`, {
      signal: signal,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
const utility2 = async (signal) => {
  try {
    const response = await axios.post(`${url}/doorControl`, {
      signal: signal,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
const utility3 = async (x, y, z) => {
  try {
    const response = await axios.post(`${url}/sensorControl`, {
      data1: x,
      data2: y,
      data3: z,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
// Express route to publish message to MQTT broker
app.post("/publish/topic/message", (req, res) => {
  const { topic, message } = req.body;
  console.log("publish Api");
  if (!topic || !message) {
    return res.status(400).json({ error: "Topic and message are required" });
  }

  // Publish the message
  // publishMessage(topic, message);
  client.publish(topic, message, (err) => {
    if (err) {
      console.error("Error publishing message:", err);
      //   res.status(500).send("Error publishing message");
    } else {
      console.log("Message published successfully");
      //   res.send("Message published successfully");
    }
  });

  res.json({ message: "Message published successfully" });
});
app.use("/auth", authRoute);
app.use("/", controlRoute);
// Start Express server
app.use("/stat", statRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
