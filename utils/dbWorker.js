var MongoClient = require('mongodb').MongoClient;
const { performance } = require('perf_hooks');
var Server = require('mongodb').Server;
const PORT = 27017;
const SERVER = 'localhost';
const DB_NAME = 'tazs';


exports.createDB = function (collectionName){
    MongoClient.connect(new Server(SERVER, PORT), function (err, db) {
            if (err) throw err;
                console.log("Database created!");

            var dbo = db.db(DB_NAME);
            dbo.createCollection(collectionName, function (err, res) {
                if (err) throw err;
                    console.log("Collection created!");
                db.close();
            });
        })
};

exports.insertData = function (data, collectionName){
    MongoClient.connect(new Server(SERVER, PORT), function (err, db) {
        if (err) throw err;
        console.log("Database created!");

         var dbo = db.db(DB_NAME);
        // dbo.collection("tazs").insert(jsonObj, function(err, res) {
        //     if (err) throw err;
        //     console.log("Number of documents inserted: " + res.insertedCount);
        //     db.close();
        //   });

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            dbo.collection(collectionName).insertOne(element, function(err, res) {
                     if (err) throw err;
                     console.log("Insert One: " + element.n_reg_new);
            });
        }
        db.close();
    });
}

let i = 0;
exports.connect = function (callback){
    MongoClient.connect(new Server(SERVER, PORT), callback);
   
}

exports.insertOne = function (data, db, collectionName) {
        var tazs = db.db(DB_NAME);
        tazs.collection(collectionName).insertOne(data, function (err, res) {
            i++;
            if (err) throw err;
            console.log("Insert: " + i +" items");
        });
}


exports.getInfo = function  (carNumber, year, onResult){
    this.connect(
        function (err, db){
            var time = performance.now();

            var dbo = db.db('tazs');
            dbo.collection(year)
            .find({"n_reg_new": carNumber})
            .toArray(function (err, res){
                onResult(res);
                console.log('Время выполнения = ',  performance.now() - time);
                db.close();
            });
        }
    )
}

exports.getInfoInMany = function (carNumber, years, onResult){    
    let i = 0;
    let res = [];
    var g = get.bind(this);
    g([]);
    function get(acumResult){
        res = acumResult.concat(res);
        if (i < years.length)
            this.getInfo(carNumber, years[i], get.bind(this))
        else
            onResult(res);
        i++;
    }  
}

exports.indexItems = function (year){
    this.connect(function (err, db){
        var dbo = db.db('tazs');
        dbo.collection(year)
        .createIndex({"n_reg_new": 1})
    })
}
