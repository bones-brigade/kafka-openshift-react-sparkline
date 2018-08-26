# kafka-openshift-react-sparkline server

This is the websocket server component for the kafka-openshift-react-sparkline
application. It should be deployed in its own container, with an exposed route
that the client can use to connect.

## Launching on OpenShift

```
oc new-app centos/python-36-centos7~https://github.com/bones-brigade/kafka-openshift-react-sparkline \
  --context-dir server \
  -e KAFKA_BROKERS=kafka:9092 \
  -e KAFKA_TOPIC=bones-brigade \
  --name=server
```

You will need to adjust the `KAFKA_BROKERS` and `KAFKA_TOPICS` variables to
match your configured Kafka deployment and desired topic.
