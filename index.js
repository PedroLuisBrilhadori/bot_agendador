let admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://bot-si-9udq-default-rtdb.firebaseio.com/'
});


function write_data(path, object) {
    admin.database().ref(path).child(object.name).set(object);
}


function read_data(path) {
    admin.database().ref(path).on('value', snap => {
        const data = snap.val();
        console.log(data);
    })
}

let client = { 
    name: 'Pedro Luis Brilhadori', 
    tel: '5516992715668',
    email: 'pedroluisbrilhadori@gmail.com'
}


// write_data('clientes', client);
read_data('clientes');