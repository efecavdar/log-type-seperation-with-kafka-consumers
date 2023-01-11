# log-type-seperation-with-kafka-consumers
# javascript codes that seperate the type of logs (system, application) to kafka consumers.
 
 # Steps : 
 * run zookeeper on docker >> docker run --name zookeeper -p 2181:2181 zookeeper
 * run kafka on docker (initilaze enviroment variables) >> docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=...(YOUR IP):2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://..(IP):9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
 * run topic.js and consumer.js (run twice because we have to need two consumers) and run producer.js to produce.
 
 ![image](https://user-images.githubusercontent.com/101645111/211812799-f1da6e85-127b-49a3-8b49-510c62b2a03e.png)
