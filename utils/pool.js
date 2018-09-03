const pool = [];

exports.startPool = function (){
    setInterval(checkPool, 10000);
}

exports.addUser = function (user){
    pool.push(user);
}

exports.userIndex = function (user){
    return pool.indexOf(user);
}

exports.removeUser = function (user){
    const index = pool.indexOf(user);
    if (index !== -1)
        pool.splice(index, 1);
}

exports.poolIsFill = function (){
   return pool.length > 200;
}


exports.poolLength = function (){
    return pool.length;
 }


function checkPool(e) {
    //console.log(e)
    if (pool.length > 200){
        pool = [];
    }
        
}

