let dao = require('../dao/dao.js');
let utils = require('../common/utils.js');
let CONST = require('../common/const.js');

module.exports = {
    /**
     * 게임 리스트 조회
     * @param param offset, limit
     * @returns {Promise<*|Promise<*>>} 게임 리스트
     */
    async getGameList(param){
        let offset = param.offset;
        let limit = param.limit;

        if(utils.isEmpty(offset)) offset = 0;
        if(utils.isEmpty(limit)) limit = 5;

        return dao.selectAllGame(Number(offset), Number(limit));
    },

    /**
     * 게임 검색
     * @param param
     * @returns {Promise<void>}
     */
    async searchGame(param){
        let query = param.q;
        let offset = param.offset;
        let limit = param.limit;

        if(utils.isEmpty(offset)) offset = 0;
        if(utils.isEmpty(limit)) limit = 20;

        return await dao.selectGame(query, Number(offset), Number(limit));
    },

    /**
     * 구독 중인 게임 조회
     * @param param
     * @returns {Promise<void>}
     */
    async getSubscribeList(param){
        let userNo = param.userNo;
        let offset = param.offset;
        let limit = param.limit;

        if(utils.isEmpty(offset)) offset = 0;
        if(utils.isEmpty(limit)) limit = 20;

        return (await dao.selectAllSubscribList(userNo,Number(offset), Number(limit))).subscribeList;
    },

    /**
     * 게임 이벤트 조회
     * @param param
     * @returns {Promise<void>}
     */
    async getGameEventList(param){
        let iso = param.iso;//클라이언트 현재 시간
        let gameIds = param.gameId;

        let clientDate = new Date(iso);
        let y = clientDate.getFullYear(),m = clientDate.getMonth();
        let firstDay = new Date(y, m, 1).toISOString();
        let lastDay = new Date(y, m + 1, 0).toISOString();

        return await dao.selectEvent(gameIds,firstDay,lastDay);
    },

    /**
     * 구독 중인 게임 이벤트 조회
     * @param param
     * @returns {Promise<void>}
     */
    async getSubscribeEventList(param){
        let userNo = param.userNo;
        let subscirbList = (await dao.selectAllSubscribList(userNo)).subscribeList;

        param.gameId = subscirbList.map(item=>{
            return item.id;
        });

        return await this.getGameEventList(param);
    },

    /**
     * 구독
     * @param param 회원 아이디, 게임 아이디
     * @returns {Promise<void>}
     */
    async subscribe(param){
        let userNo = param.userNo;
        let gameId = param.gameId;
        let gameName = param.gameName;

        let gameInfo = {
            id: gameId
            ,name: gameName
        };

        let subscribeList = (await dao.selectAllSubscribList(userNo)).subscribeList;

        let updateFlag = true;

        subscribeList.find(item=>{
            if(item.id === gameId){
                updateFlag = false;
            }
        });

        if(updateFlag) {
            await dao.insertSubscribeList(userNo,gameInfo);
            subscribeList.push(gameInfo);
        } else {
            console.log('이미 구독된 게임',gameInfo);
        }

        return subscribeList;
    },

    /**
     * 구독 취소
     * @param param
     * @returns {Promise<number>}
     */
    async cancelSubscribe(param){
        let userNo = param.id;
        let gameId = param.gameId;

        await dao.deletesubScribe(userNo,gameId);

        return (await dao.selectAllSubscribList(userNo,0,20)).subscribeList;
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