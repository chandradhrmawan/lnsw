let queue = require("./amqp_lib.js");
var message = {type: '2', content: 'Hello RabbitMQ!! from backend repo'};

queue.publishExchange('lnsw.fanout.backend', 'fanout', '', JSON.stringify(message))
// queue.publishExchange('lnsw.direct', 'direct', 'testroute1', JSON.stringify(message))
