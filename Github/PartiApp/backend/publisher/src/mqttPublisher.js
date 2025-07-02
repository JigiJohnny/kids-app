import fs from 'fs';
import mqtt from 'mqtt';

const brokerUrl = 'ws://localhost:9001';
const topic = 'kinderapp/herne';

const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('✅ MQTT verbunden');
  const offers = JSON.parse(fs.readFileSync('offers.json', 'utf8'));
  client.publish(topic, JSON.stringify(offers), () => {
    console.log(`📡 Angebote gesendet an "${topic}"`);
    client.end();
  });
});
