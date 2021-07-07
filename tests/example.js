const getNamePoints = require('../index.js');

let nameArray = null;
getNamePoints('tushartiwari', function callBackFn(err,resp) {
    err ? console.log(err): null;
    resp ? nameArray = resp : null;

})

console.log(nameArray);