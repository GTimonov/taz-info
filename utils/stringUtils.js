exports.checkString = function (str){
    if (str.length > 10)
        return false;
    
    var problem = str.match(/[^a-z0-9а-яіїє-\s]/i);
    var noProblem = problem===null;
    if (!noProblem)
        console.log('reg problem:' + problem);
    return noProblem;
}

exports.validateString = function (str){
    //console.log('text before:' + str);

    let text = String(str).toUpperCase();
    text=text.replace(/^\s*/,'').replace(/\s*$/,'');
    text=text.replace(/[И]/g, 'І');
   
   
    //console.log('text after:' + text);

    return text;
}