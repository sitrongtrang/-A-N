const mqtt = require("mqtt");
const mqttOptions = {
  host: "mqtt.ohstem.vn",
  port: 1883,
  username: "thinhdadn",
  password: "hehe",
};
const client = mqtt.connect(mqttOptions);
client.on("connect", () => {
  console.log("Connected to MQTT broker");
  // const topics = [
  //   "thinhdadn/feeds/V2/humidity",
  //   "thinhdadn/feeds/V2/temperature",
  //   "thinhdadn/feeds/V2/sun",
  //   "thinhdadn/feeds/V2/door",
  //   "thinhdadn/feeds/V2/lights",
  //   "thinhdadn/feeds/V2/fan",
  // ];

  // client.subscribe(topics, (err) => {
  //   if (err) {
  //     console.error("Error subscribing to topic:", err);
  //   } else {
  //     console.log("Subscribed to topic: ", topics.join(","));
  //   }
  // });
});

const publishMessage = (topic, message) => {
  client.publish(topic, message, (err) => {
    if (err) {
      console.error("Error publishing message:", err);
      //   res.status(500).send("Error publishing message");
    } else {
      console.log("Message published successfully");
      //   res.send("Message published successfully");
    }
  });
};
module.exports = { publishMessage };
