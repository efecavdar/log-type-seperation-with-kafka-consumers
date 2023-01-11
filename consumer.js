const { Kafka } = require("kafkajs");

createConsumer();

async function createConsumer(){
    try {
        const kafka = new Kafka({
            clientId : "kafka_log_store_client",
            brokers : ["192.168.56.1:9092"]
        });

        const consumer = kafka.consumer({
            groupId : "log_consumer_group"
        });
        console.log("Connecting to Consumer...");
        await consumer.connect();
        console.log("Connected to Consumer sucsessfully.");

        // consumer subsucribe
        await consumer.subscribe({
            // we have two topics ((Topic : Logs, numPartitions : 1), (Topic : Logs2, numPartitions : 2))
            topic : "SystemLogs",
            fromBeginning : true
        })

        await consumer.run({
            eachMessage : async result => {
                console.log(`Incoming message => ${result.message.value} : Partition : => ${result.partition}`);
            }
        })
    } catch (error) {
        console.log("Error!!!!", error);
    }
}


