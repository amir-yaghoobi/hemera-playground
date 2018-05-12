const Hemera = require('nats-hemera')
const nats = require('nats').connect();

const mode = process.argv[2] || 'READ';

if(mode === 'WRITE'){
    if(process.argv[3] === undefined){
        console.log('[ERROR] Usage node worker.js WRITE new_value');
        process.exit(1);
    }
    var value = process.argv[3];
}

const hemera = new Hemera(nats)

hemera.ready(() => {
    console.log('[READY] Worker on mode:', mode)

    if(mode === 'READ'){
        read();
    }else{
        change();
        // async_change();
    }
})

function read(){
    hemera.act({
        topic: 'chabok',
        cmd: 'read:normal'
    },
    function(err, resp){
        console.log('[RESPONSE] value is', resp.value);
        process.exit(0);
    })
}


function change(){
    hemera.act({
        topic: 'chabok',
        cmd: 'change:normal',
        secret: value
    },
    function (err, resp) {
        if(err) console.log('[ERR]', err);
        console.log('[RESPONSE] value changed to', resp.value);
        process.exit(0);
    }
)
}
    
async function async_change() {
    try{
        let response = await hemera.act({
            topic: 'chabok',
            cmd: 'change:await',
            secret: value
        })
        
        console.log('[RESPONSE] await', response.data);
    }catch(e){
        console.log('[ERROR]', e);
    }
}
