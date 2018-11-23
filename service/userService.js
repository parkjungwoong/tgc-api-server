let dao = require('../dao/dao.js');
let utils = require('../common/utils.js');
let CONST = require('../common/const.js');

module.exports =  {

    //회원 가입
    async addUser(userInfo){

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
    },

    //외부 연동 로그인
    async thirdPartyLogin(param){
        //console.log('thirdPartyLogin',param);
        let userInfo = param;

        switch (userInfo.thirdPartyLinkApp) {
            case 'faceBook':
                //페이스북 userId 값에 F문자 포함해서 userNo로 만들고 나머지 정보 저장
                userInfo.userNo = 'F'+userInfo.thirdPartyLinkInfo.authResponse.userID;
                //페이스북에 해당 엑세스 토큰이 맞는지 검사
                break;
            default:
                //지원하지 않는 로그인 타입
                throw CONST.NOT_SUPPORTED_LOGIN_TYPE;
        }
        //console.log('after',JSON.stringify(userInfo));
        let inUserInfo = await dao.selectUser(userInfo.userNo);

        //기존 로그인 연동 정보 있는지 확인
        if(utils.isEmpty(inUserInfo)) {
            await this.addUser(userInfo);
        } else {
            await this.updateUserInfo(userInfo);
        }

        return await dao.selectUser(userInfo.userNo);
    }
};