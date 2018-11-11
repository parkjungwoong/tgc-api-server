let utils = require('../common/utils.js');

var mongoose = require('mongoose');
mongoose.connect(process.env.DB_CON);
mongoose.Promise = global.Promise;

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var gameS = require('./schema/game.js');
let userS = require('./schema/user.js');

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
                push: userInfo.setInfo.push ? new Date().getTime() : '',
                marketing: userInfo.setInfo.marketing ? new Date().getTime() : ''
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

    async selectUser(id) {
        console.log('id=>',id);
        return await userS.findOne({id:id});
    },

    //게임 조회
    async selectAllGame(offset,limit) {
        return await gameS.find().skip(offset).limit(limit);
    },

    //구독 추가
    async insertSubscribeList(userNo,gameInfo){
        return await userS.update({id: userNo}, { $push: { subscribeList: gameInfo } });
    },

    //구독 중인 게임 조회
    async selectAllSubscribList(userNo,offset,limit){
        return await userS.findOne({id:userNo},{subscribeList:1,_id:0}).skip(offset).limit(limit);
    },

    //구독 삭제
    async deletesubScribe(userNo,gameId){
        return await userS.updateOne({id: userNo}, { $pull: { subscribeList: {id: gameId} } });
    },
};