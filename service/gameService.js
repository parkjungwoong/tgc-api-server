const queryString = require('query-string');
let dao = require('../dao/dao.js');
let utils = require('../common/utils.js');
let CONST = require('../common/const.js');
let userService = require('./userService.js');


module.exports = {
    /**
     * 게임 리스트 조회
     * @param param offset, limit
     * @returns {Promise<*|Promise<*>>} 게임 리스트
     */
    async getGameList(param){
        let pageObj = utils.generatePageObj(param);

        return dao.selectGameList(pageObj);
    },

    /**
     * 게임 검색
     * @param param
     * @returns {Promise<void>}
     */
    async searchGame(param){
        let query = decodeURIComponent(param.q);
        let quertObj = queryString.parse(query);

        let pageObj = utils.generatePageObj(param);

        //todo: 이름 또는 타입으로 검색 기능 추가하기
        return await dao.selectGame(quertObj.id, pageObj);
    },

    /**
     * 구독 중인 게임 조회
     * @param param
     * @returns {Promise<void>}
     */
    async getSubscribeList(param){
        let userNo = param.userNo;
        let pageObj = utils.generatePageObj(param);

        let subscribeList = await dao.selectSubscribList(userNo, pageObj);
        subscribeList = utils.isEmpty(subscribeList) ? [] :  subscribeList.subscribeList;

        let res = subscribeList.map(value=>{
            return value.gameInfo;
            //todo: 구독일 object 병합이 안되네 ....
            //return Object.assign(value.gameInfo,{'inDt':value.inDt});
        });

        return res;
    },

    /**
     * 게임 이벤트 조회
     * @param param
     * @returns {Promise<void>}
     */
    async getGameEventList(param){
        let iso = decodeURIComponent(param.iso);//클라이언트 현재 시간
        let gameObjIdList = param.gameObjIdList;
        console.log('iso',iso);
        let clientDate = new Date(iso);
        let y = clientDate.getFullYear(),m = clientDate.getMonth();
        let firstDayOfMonth = new Date(y, m, 1).toISOString();
        let lastDayOfMonth = new Date(y, m + 1, 0).toISOString();

        return await dao.selectEvent(gameObjIdList, firstDayOfMonth, lastDayOfMonth);
    },

    /**
     * 구독 중인 게임 이벤트 조회
     * @param param
     * @returns {Promise<void>}
     */
    async getSubscribeEventList(param){
        let userNo = param.userNo;
        let subscribeList = await dao.selectAllSubscribList(userNo);
        subscribeList = utils.isEmpty(subscribeList) ? [] :  subscribeList.subscribeList;

        param.gameObjIdList = subscribeList.map(item=>{
            return item.gameInfo._id;
        });

        return await this.getGameEventList(param);
    },

    /**
     * 구독
     * @param param 회원 아이디, 게임 아이디
     * @returns {Promise<void>}
     */
    async subscribe(param){
        console.log('param',param);
        let userNo = param.userNo;
        let gameObjId = param._id;

        await userService.getUser(param);

        let subscribeList = await this.getSubscribeList(param);

        let updateFlag = true;

        subscribeList.find(item=>{
            if(item._id == gameObjId){
                updateFlag = false;
            }
        });

        if(updateFlag) {
            await dao.insertSubscribeList(userNo,gameObjId);

            subscribeList = await this.getSubscribeList(param);
        } else {
            console.log('이미 구독된 게임',gameObjId);
        }

        return subscribeList;
    },

    /**
     * 구독 취소
     * @param param
     * @returns {Promise<number>}
     */
    async cancelSubscribe(param){
        let userNo = param.userNo;
        let gameObjId = param._id;
        console.log('userNo = '+userNo);
        console.log('gameObjId = '+gameObjId);
        await dao.deletesubScribe(userNo,gameObjId);

        return await this.getSubscribeList(param);
    },

    /**
     * 사용자 알림 추가
     * @param param
     * @returns {Promise<void>}
     */
    async insertRemindInfo(param){
        let userNo = param.userNo;
        let eventId = param.eventId;
        let remindDay = param.remindDay;

        await dao.insertRemind(userNo,eventId,remindDay);
    }
};