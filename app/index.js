let admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://a-clinica-jxup-default-rtdb.firebaseio.com/'
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
