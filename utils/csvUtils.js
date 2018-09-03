let csv = require('csvtojson');

exports.createJSON = function (csvFilePath, callback) {
    csv({
        delimiter: [";"]
    }).fromFile(csvFilePath).then((jsonObj) => {
        callback(jsonObj)
    });
}

exports.parseEachLine = function (csvFilePath, onEachLine) {
    console.log("Start Parce");
    csv({
        delimiter: [";"]
    })
    .on('data', (data) => {
        const jsonStr= JSON.parse(data.toString('utf8'))
        onEachLine(jsonStr)
    })
    .fromFile(csvFilePath)
    .preFileLine((fileLineString, lineIdx)=>{
        if (lineIdx === 2){
            return fileLineString.replace('some value','another value')
        }
        return fileLineString
    })
    .then((json)=>{
        console.log("End Parce")
        
    })
    
    
    
}