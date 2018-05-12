const Hemera = require('nats-hemera')
const nats = require('nats').connect();

const hemera = new Hemera(nats)

hemera.ready(() => {
    console.log('[READY] subscribe');
    //Subscribe
    hemera.add({
            pubsub$: true,
            topic: 'update',
            cmd: 'config'
        },
        function (req) {
            console.log('[UPDATE] secret updated to', req.secret);
        }
    )
})
