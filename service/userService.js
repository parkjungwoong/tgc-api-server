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
    async getUser(param){
        let userNo = param.userNo;

        let userInfo = await dao.selectUser(userNo);

        if(utils.isEmpty(userInfo)) {
            throw CONST.USER_NOT_FOUND;
        }

        return userInfo;
    },

    //회원 정보 수정
    async updateUserInfo(param){
        //todo: 회원 검증
        let userNo = param.userNo;
        let updateInfo = {};

        Object.keys(param).forEach(key=>{
            if(key == 'setInfo') {
                Object.keys(param.setInfo).forEach(setKey=>{
                    let setInfo = param.setInfo;
                    setInfo[setKey] = setInfo[setKey] ? new Date().toISOString() : '';
                    updateInfo['setInfo.'+setKey] = setInfo[setKey];
                });
            } else if(key != 'userNo'){
                updateInfo[key] = param[key];
            }
        });

        return await dao.updateUser(userNo,updateInfo);
    },

    //메시지 리스트 조회
    async getMessageList(param){
        let userNo = param.userNo;

        let pageObj = utils.generatePageObj(param);

        return await dao.selectMessageList(userNo,pageObj);
    }

}