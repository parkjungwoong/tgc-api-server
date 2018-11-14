let dao = require('../dao/dao.js');
let utils = require('../common/utils.js');
let CONST = require('../common/const.js');

module.exports =  {

    //회원 가입
    async addUser(userInfo){
        //todo:유효값 검사
        //todo:연동 데이터 확인, 어떤게 고유 구분값인지
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

    //회원 조회
    async getUser(id){
        let userInfo = await dao.selectUser(id);

        if(utils.isEmpty(userInfo)) {
            throw CONST.USER_NOT_FOUND;
        }

        return utils.makeResMeg({result:userInfo});
    },

    //회원 정보 수정
    async updateUserInfo(param){
        //todo: 회원 검증
        let userNo = param.userNo;
        let updateInfo = param.updateInfo;

        return await dao.updateUser(userNo,updateInfo);

    },

    //메시지 리스트 조회
    async getMessageList(param){
        let userNo = param.userNo;
        let offset = param.offset;
        let limit = param.limit;

        if(utils.isEmpty(offset)) offset = 0;
        if(utils.isEmpty(limit)) limit = 20;

        return await dao.selectMessageList(userNo,Number(offset),Number(limit));
    }

}