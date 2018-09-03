

let dbWorker = require('./utils/dbWorker');
let jsonUtil = require('./utils/jsonUtil');
const years = ['2018', '2017', '2016', '2015', '2014', '2013'];

/////////////////////////////////////////////////////////////
//createDB
////////////////////////////////////////////////////////////

//dbWorker.createDB();



dbWorker.getInfo("АХ5735НА", '2018', onResult);
//dbWorker.indexItems('2013');
function onResult(res){
    console.log(JSON.stringify(res, null, 2));
    res.forEach(element => {
        console.log(jsonUtil.jsonToTelega(element))
    });
    
}

//dbWorker.getInfoInMany("АХ7174КХ", years, onResult);




