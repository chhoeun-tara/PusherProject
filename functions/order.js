// const axios = require('axios');

const Pusher = require("pusher");

let pusher = new Pusher({
    appId: "1110767",
    key: "30c2132fd5e3962a8b41",
    secret: "b3114f69f441242bc833",
    cluster: "ap1",
    useTLS: true
});
exports.handler = function (event, context, callback) {

    const send = body => {
        callback(null, {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Header':
                    'Origin, X-Requested-With, Content-Type, Accept'
            },
            body: body
        });
    }
    if (event.httpMethod === 'GET') {
        send('Hello World');
    }
    if (event.httpMethod === 'POST') {
        const data = event.body;
        send(data);
    }
}