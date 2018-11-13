let CONST = require('./const.js');

module.exports =  {
    isEmpty(obj) {

        if(typeof obj === 'string'){
            return obj.trim() == '';
        } else {
            return obj === undefined || obj == null || obj.length == 0;
        }
    },

    makeResMeg(res){
        return {
            resCode : res.code ? res.code : CONST.SUCCESS.code
            ,resMsg : res.message ? res.message : CONST.SUCCESS.message
            ,result : res.result
        }
    },

    //todo: validation 함수 만들기, (ojbect,keys) true,false
}