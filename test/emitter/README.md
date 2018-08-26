# kafka-openshift-react-sparkline test emitter

This app will broadcast random integers between 0-100 (inclusive) to the
specified kafka brokers and topic, at the requested rate.

## Launching on OpenShift

```
oc new-app centos/python-36-centos7~https://github.com/bones-brigade/kafka-openshift-react-sparkline \
  --context-dir test/emitter \
  -e KAFKA_BROKERS=kafka:9092 \
  -e KAFKA_TOPIC=bones-brigade \
  --name=emitter
```

You will need to adjust the `KAFKA_BROKERS` and `KAFKA_TOPICS` variables to
match your configured Kafka deployment and desired topic.
