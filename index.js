const Hemera = require('nats-hemera')
const nats = require('nats').connect();

const hemera = new Hemera(nats)

let secret_value = 'SECRET'

function publishUpdate(){
    //Publish
    hemera.act({
        pubsub$: true,
        topic: 'update',
        cmd: 'config',
        secret: secret_value
    })
    console.log('[PUBLISHED] config change.');
}


hemera.ready(() => {
    console.log('Server ready.')
    hemera.add({
            topic: 'chabok',
            cmd: 'read:normal'
        },
        function (req, cb) {
            console.log('[READ] secret');
            cb(null, {
                value: secret_value
            });
        });


    hemera.add({
            topic: 'chabok',
            cmd: 'change:normal'
        },
        function (req, cb) {
            console.log(`[CHANGE] Secret value changed from ${secret_value} to ${req.secret}`);
            secret_value = req.secret;
            cb(null, {
                value: req.secret
            })
            process.emit('secret changed');            

        }
    );

    // async/await 
    hemera.add({
            topic: 'chabok',
            cmd: 'change:await',
        },
        async function (req) {
            console.log(`[CHANGE] Secret value changed from ${secret_value} to ${req.secret}`);
            process.emit('secret changed');            
            return await {
                value: secret_value
            }
        })

})


process.on('secret changed', publishUpdate)
