let utils = require('../common/utils.js');

var mongoose = require('mongoose');
mongoose.connect(process.env.DB_CON);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let gameS = require('./schema/game.js');
let userS = require('./schema/user.js');
let eventS = require('./schema/event.js');
let messageS = require('./schema/message.js');
let remindS = require('./schema/remind.js');

module.exports =  {

    //회원 추가
    async insertUser(userInfo){
        let newUser = new userS({
            userNo: userInfo.userNo,
            name: userInfo.name,
            email: userInfo.email,
            thirdPartyLinkApp: userInfo.thirdPartyLinkApp,
            thirdPartyLinkInfo: userInfo.thirdPartyLinkInfo,
            pw: userInfo.pw,
            state: '10',
            setInfo: {
                pushAgree: userInfo.setInfo.pushAgree ? new Date().toISOString() : '',
                marketing: userInfo.setInfo.marketing ? new Date().toISOString() : ''
            },
            device: {
                appVer: userInfo.appVer,
                osType: userInfo.osType,
                osVer: userInfo.osVer
            },
            token: userInfo.token,
            inDt: new Date().getTime()
        });

        await newUser.save();
    },

    //회원 조회
    async selectUser(id) {
        return await userS.findOne({userNo:id});
    },

    //회원 정보 갱신
    async updateUser(userNo, updateInfo){
        return await userS.updateOne({userNo: userNo}, { $set: updateInfo });
    },

    //메시지 조회
    async selectMessageList(userNo,pageObj){
        return await messageS.find({userNo:userNo}).sort({inDt:-1}).skip(pageObj.offset).limit(pageObj.limit);
    },

    //모든 게임 리스트 조회
    async selectGameList(pageObj){
        return await gameS.find().skip(pageObj.offset).limit(pageObj.limit);
    },

    //게임 검색
    async selectGame(query, pageObj){
        return await gameS.find({_id:query}).skip(pageObj.offset).limit(pageObj.limit);
        //todo: 이름 또는 타입으로 검색 기능 추가시 사용
        //return await gameS.find({$or:[ {name: {$regex: '.*'+query+'.*'} }, {id:query} ]}).skip(offset).limit(limit);
    },

    //이벤트 조회
    async selectEvent(gameId,stDt,enDt){
        return await eventS.find({
            stDt: { $gte: new Date(stDt) }
            ,enDt: { $lte: new Date(enDt) }
            ,'gameInfo._id': { $in: gameId }
        },{pushInfo:0,_class:0,md5hashCode:0,isFixed:0});
    },

    //구독 추가
    async insertSubscribeList(userNo,gameObjId){
        return await userS.update({userNo: userNo}, { $push: { subscribeList: { 'gameInfo': gameObjId } } });
    },

    //구독 중인 게임 조회 (전체)
    async selectAllSubscribList(userNo){
        return await userS.findOne({userNo:userNo},{subscribeList:1,_id:0}).populate('subscribeList.gameInfo');
    },

    //구독 중인 게임 조회 (페이징)
    async selectSubscribList(userNo, pageObj){
        //todo: 페이징 동작 안함 !!
        return await userS.findOne({userNo:userNo},{subscribeList:1,_id:0}).populate('subscribeList.gameInfo').skip(pageObj.offset).limit(pageObj.limit);
    },

    //구독 삭제
    async deletesubScribe(userNo,gameObjId){
        return await userS.update({userNo: userNo}, { $pull: { 'subscribeList': { 'gameInfo':gameObjId }} },{multi:false});
    },

    //사용자 알림 추가
    async insertRemind(userNo,eventId,remindDay){
        let newRemind = new remindS({
            id:utils.generateUUID(),
            userNo:userNo,
            eventId:eventId,
            remindDay:remindDay,
            inDt:new Date().toISOString(),
            upDt:new Date().toISOString()
        });

        await newRemind.save();
    }

};