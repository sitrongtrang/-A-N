#pip install paho-mqtt==1.6.1
import paho.mqtt.client as mqtt
import time
import random
from mqtt import *
from uart import *

#declare MQTT client
client = MQTTController("mqtt.ohstem.vn", 1883, "thinhdadn", "hehe",[],
                                        "thinhdadn/feeds/V2/#")


# start define your topics here
feedArray = ["humidity","temperature","sun","door","lights","fan"]

#assign topic to MQTTclient
for feed in feedArray:
    client.declare_topic(f"thinhdadn/feeds/V2/{feed}")
print(client.get_all_topics())


while True:        
    readSerial(client,ser)
    time.sleep(1)