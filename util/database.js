const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback =>{
    MongoClient.connect('mongodb+srv://impk1103:pk339900@cluster0.yqcmj.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then(client => {console.log('connected!!!');
    _db = client.db()
    callback(client);
})
.catch(err=> {
    console.log(err);
    throw err;
});
};

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No Database Found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;