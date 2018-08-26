import argparse
import asyncio
import functools
import json
import logging
import os

from kafka import KafkaConsumer
import websockets


def get_arg(env, default):
    return os.getenv(env) if os.getenv(env, '') is not '' else default


def parse_args(parser):
    args = parser.parse_args()
    args.brokers = get_arg('KAFKA_BROKERS', args.brokers)
    args.topic = get_arg('KAFKA_TOPIC', args.topic)
    args.host = get_arg('WEBSOCKET_HOST', args.host)
    args.port = get_arg('WEBSOCKET_PORT', args.port)
    return args


async def update(websocket, path, brokers, topic):
    try:
        consumer = KafkaConsumer(topic, bootstrap_servers=brokers)
        for msg in consumer:
            # check to ensure that client is ready
            pong_waiter = await websocket.ping()
            await pong_waiter
            # send message as a string
            await websocket.send(str(int(msg.value)))
    except Exception:
        websocket.close()


if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    logging.info('starting kafka-react-openshift-python-sparkline')
    parser = argparse.ArgumentParser(
            description='listen for some stuff on kafka and push it over websocket')
    parser.add_argument(
            '--brokers',
            help='The bootstrap servers, env variable KAFKA_BROKERS',
            default='localhost:9092')
    parser.add_argument(
            '--topic',
            help='Topic to publish to, env variable KAFKA_TOPIC',
            default='bones-brigade')
    parser.add_argument(
            '--host',
            help='Hostname to use for websocket server',
            default='0.0.0.0')
    parser.add_argument(
            '--port',
            help='Port to use for websocket server',
            default=8080)
    args = parse_args(parser)

    # setup the websocket server
    bound_handler = functools.partial(
            update,
            brokers=args.brokers,
            topic=args.topic)
    start_server = websockets.serve(bound_handler, args.host, args.port)

    # start the websocket coroutine
    asyncio.get_event_loop().run_until_complete(start_server)
    asyncio.get_event_loop().run_forever()

    logging.info('exiting')
