const { Kafka } = require("kafkajs");
const { Partitioners } = require('kafkajs')
const log_data = require("./logs.json")

createProducer();

async function createProducer(){
    try {
        const kafka = new Kafka({
            clientId : "kafka_log_store_client",
            brokers : ["192.168.56.1:9092"]
        });

        const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
        console.log("Connecting to Producer...");
        await producer.connect();
        console.log("Connected to Producer sucsessfully.");

        let messages = log_data.map(item => {
            return{
                value : JSON.stringify(item),
                partition : item.type == "system" ? 0 : 1
            }
        })

        const message_result = await producer.send({
            topic : "SystemLogs",
            messages : messages
        });        
        console.log("Message sent successfully", JSON.stringify(message_result));
        await producer.disconnect();
    } catch (error) {
        console.log("Error!!!!", error);
    } finally{
        process.exit(0);
    }
}


