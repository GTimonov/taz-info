

let dbWorker = require('../utils/dbWorker');
let csvUtils = require('../utils/csvUtils');

const CSV_FILE_PATH='./csvData/2018.csv';
const COLLECTION_NAME = '2018';
/////////////////////////////////////////////////////////////
////parse simple
////////////////////////////////////////////////////////////

//csvUtils.createJSON(CSV_FILE_PATH, dbWorker.insertData);

/////////////////////////////////////////////////////////////
//connect, parce, inser each line
////////////////////////////////////////////////////////////

dbWorker.connect(
    function onConnect(err, db){
        console.log("connect");
        if (err) throw err;
        function insert (data){
            dbWorker.insertOne(data, db, COLLECTION_NAME)
        }
        csvUtils.parseEachLine(CSV_FILE_PATH, insert);
    }
)
