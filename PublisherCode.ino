#include <WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"
#define DHTPIN 4     
#define DHTTYPE DHT11   // DHT 11
DHT dht(DHTPIN, DHTTYPE);
const char* ssid = "OPPO Reno5";
const char* password = "amine1234";
const char* mqttServer = "192.168.179.208";
const int mqttPort = 1883;
const char* mqttUser = "user";
const char* mqttPassword = "user";
String temp_str; //see last code block below use these to convert the float that you get back from DHT to a string =str
String hum_str;
char temp[50];
char hum[50];
WiFiClient espClient;
PubSubClient client(espClient);
void setup() {
dht.begin();
Serial.begin(115200);
WiFi.begin(ssid, password);
while (WiFi.status() != WL_CONNECTED) {
delay(500);
Serial.println("Connecting to WiFi..");
}
Serial.println("Connected to the WiFi network");
client.setServer(mqttServer, mqttPort);
while (!client.connected()) {
Serial.println("Connecting to MQTT...");
if (client.connect("ESP32Client", mqttUser, mqttPassword )) {
Serial.println("connected");
} else {
Serial.print("failed with state ");
Serial.print(client.state());
delay(2000);}
}
//client.publish("esp32/esp32test", "Hello from ESP32learning");
}
void loop() {

client.loop();
float h = dht.readHumidity();
//String str1 = String(h, 1)
//hum_str = String(h); //converting Humidity (the float variable above) to a string
//hum_str.toCharArray(hum, hum_str.length() + 1); //packaging up the data to publish to mqtt whoa...

//client.publish("esp32/Hum", h); //hum
float t = dht.readTemperature();
temp_str = String(t); //converting Humidity (the float variable above) to a string
temp_str.toCharArray(temp, temp_str.length() + 1); //packaging up the data to publish to mqtt whoa...
//client.publish("esp32/Tmp", t); //hum
  // Check if any reads failed and exit early (to try again).

//client.publish("sensor/Hum",  hum);
client.publish("sensor/Tem",  temp);
  //Serial.print(F("Humidity: "));
  Serial.println(h);
  //Serial.print(F("%  Temperature: "));
  //Serial.print(t);

}
