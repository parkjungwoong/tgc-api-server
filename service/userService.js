let dao = require('../dao/dao.js');
let utils = require('../common/utils.js');
let CONST = require('../common/const.js');

module.exports =  {

    //회원 가입
    async addUser(userInfo){
        //유효값 검사
        switch (userInfo.regType) {
            //faceBook
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            default:

        }

        //회원 정보 입력
        return await dao.insertUser(userInfo);
    },

    async getUser(id){
        let userInfo = await dao.selectUser(id);

        if(utils.isEmpty(userInfo)) {
            return utils.makeResMeg(CONST.USER_NOT_FOUND);
        } else {
            return utils.makeResMeg({result:userInfo});
        }
    }
}