const { MongoClient } = require('mongodb');

const CONNECTION_STRING = 'mongodb://192.168.99.100:32769/webapp';

//Funktion: Wenn db Verbindung hergestellt wird, wird das Dokument eingefügt. (name, message)
const persistMail = (author, message) =>
    MongoClient
        .connect(CONNECTION_STRING)
        .then((db) => {
            //DB wird erzeugt und in "collection" aufgefangen
            const collection = db.collection('mails');

            const document = {
                author,
                message
            };

            return collection
                .insertOne(document)
                .then(() => 
                    db.close()
                );
        });

module.exports.persistMail = persistMail;