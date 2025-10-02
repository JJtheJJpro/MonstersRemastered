#include <WiFiNINA.h>
#include <ArduinoMqttClient.h>

WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

char ssid[] = "Jonesies";
char pass[] = "a88b90c91d";
//char mqtt[] = "wss://broker.hivemq.com:8884/mqtt";
char mqtt[] = "broker.hivemq.com";
int mqtt_port = 8884;
char mqtt_topic[] = "jjthejjpro/monsters";
int status = WL_IDLE_STATUS;

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);

  Serial.setTimeout(-1);
  Serial1.setTimeout(-1);
  WiFi.setTimeout(-1);

  pinMode(LED_BUILTIN, OUTPUT);

  while (status != WL_CONNECTED) {
    status = WiFi.begin(ssid, pass);
  }
  digitalWrite(LED_BUILTIN, HIGH);
  delay(125);
  digitalWrite(LED_BUILTIN, LOW);
  delay(125);
  digitalWrite(LED_BUILTIN, HIGH);
  delay(125);
  digitalWrite(LED_BUILTIN, LOW);
  delay(125);
  
  mqttClient.connect(mqtt, mqtt_port);
}

void loop() {
  mqttClient.poll();
  if (Serial1) {
    Serial1.write(0b00000011);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(5000);
  } else {
    digitalWrite(LED_BUILTIN, LOW);
  }
}
