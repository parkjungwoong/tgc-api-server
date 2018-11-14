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

    generateUUID() {
        let d = new Date().getTime();
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }


//todo: validation 함수 만들기, (ojbect,keys) true,false
}