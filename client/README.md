# kafka-react-openshift-python-sparkline client

This is the browser side code for the kafka-react-openshift-python-sparkline
application. It can be built and served as a static page in several ways. For
convenience it is deployed as a nodejs application using instructions from the
upstream
[Create React App](https://github.com/facebookincubator/create-react-app)
project.

## Launching on OpenShift

```
oc new-app centos/nodejs-8-centos7~https://github.com/bones-brigade/kafka-react-openshift-python-sparkline \
  --context-dir client \
  -e REACT_APP_WEBSOCKET_URI=<your server route URL> \
  --name=client
```

You will need to adjust the `REACT_APP_WEBSOCKET_URI` to match the route for
your server application. Please note, this must be in the form `ws://hostname/`.
