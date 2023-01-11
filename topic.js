const { Kafka } = require("kafkajs");


createTopic();

async function createTopic(){
    try {
            // admin stuff .. 
            const kafka = new Kafka({
                clientId : "kafka_log_store_client",
                brokers : ["192.168.56.1:9092"]
        });

        const admin = kafka.admin();
        console.log("Connecting to Kafka broker...");
        await admin.connect();
        console.log("Connected to Kafka broker, topics will be created...");
        await admin.createTopics({
            topics : [
                {
                    topic : "SystemLogs",
                    numPartitions : 2
                }
            ]
        })
        console.log("Topic has been created successfully!");
        await admin.disconnect();
    } catch (error) {
        console.log("Error!!!!", error);
    } finally{
        process.exit(0);
    }
}


