const mqtt = require("mqtt");
const { url } = require("../link.js");
const axios = require("axios");
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
const mqttOptions = {
  host: "mqtt.ohstem.vn",
  port: 1883,
  username: "thinhdadn",
  password: "hehe",
};
// const topics1 = [
//   "thinhdadn/feeds/V2/humidity",
//   "thinhdadn/feeds/V2/temperature",
//   "thinhdadn/feeds/V2/sun",
//   "thinhdadn/feeds/V2/door",
//   "thinhdadn/feeds/V2/lights",
//   "thinhdadn/feeds/V2/fan",
// ];
const client = mqtt.connect(mqttOptions);
client.on("connect", () => {
  console.log("Connected to MQTT broker");
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
      console.error("Error subscribing to topic:", err);
    } else {
      console.log("Subscribed to topic: ", topics.join(","));
    }
  });
});

// Handle MQTT message reception
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

      break;
    case "thinhdadn/feeds/V2/humidity":
      // Handle messages for the "humidity" topic
      break;
    // Add cases for other topics as needed
    case "thinhdadn/feeds/V2/sun":
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
