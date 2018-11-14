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
            id: userInfo.id,
            name: userInfo.name,
            email: userInfo.email,
            thirdPartyLink: [userInfo.regType],
            pw: userInfo.pw,
            state: '10',
            setInfo: {
                push: userInfo.setInfo.push ? new Date().toISOString() : '',
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
        return await userS.findOne({id:id});
    },

    //회원 정보 갱신
    async updateUser(uesrNo, updateInfo){
        return await userS.updateOne({id: uesrNo}, { $set: updateInfo });
    },

    //메시지 조회
    async selectMessageList(userNo,offset,limit){
        return await messageS.find({userNo:userNo}).sort({inDt:-1}).skip(offset).limit(limit);
    },

    //모든 게임 리스트 조회
    async selectAllGame(offset,limit){
        return await gameS.find().skip(offset).limit(limit);
    },

    //게임 검색
    async selectGame(query,offset,limit){
        return await gameS.find({$or:[ {name: {$regex: '.*'+query+'.*'} }, {id:query} ]}).skip(offset).limit(limit);
    },

    //이벤트 조회
    async selectEvent(gameId,stDt,enDt){
        return await eventS.find({
            stDt: { $gte: new Date(stDt) }
            ,enDt: { $lte: new Date(enDt) }
            ,'gameInfo.id': {$in: gameId}
        });
    },

    //구독 추가
    async insertSubscribeList(userNo,gameInfo){
        return await userS.update({id: userNo}, { $push: { subscribeList: gameInfo } });
    },

    //구독 중인 게임 조회
    async selectAllSubscribList(userNo,offset,limit){
        if(utils.isEmpty(offset) && utils.isEmpty(limit)){
            return await userS.findOne({id:userNo},{subscribeList:1,_id:0});
        } else {
            return await userS.findOne({id:userNo},{subscribeList:1,_id:0}).skip(offset).limit(limit);
        }
    },

    //구독 삭제
    async deletesubScribe(userNo,gameId){
        return await userS.updateOne({id: userNo}, { $pull: { subscribeList: {id: gameId} } });
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