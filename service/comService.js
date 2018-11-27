let dao = require('../dao/dao.js');
let utils = require('../common/utils.js');

module.exports = {
    async checkAppInit(param){
        let result = {
            upDateInfo: {
                msg:''
                ,appLink:''
                ,isNew: false
                ,isNecessary: false
            },
            banner: {
                msg:''
                ,title:''
                ,img:''
                ,type:''
                ,link:''
            }
        };

        let clientVer = param.ver;
        let clientOs = param.os.toLowerCase();

        let latestAppInfo = await dao.selectAppVer(clientOs);

        if(utils.isNotEmpty(latestAppInfo) && clientVer != latestAppInfo.version){
            result.upDateInfo.isNew = true;
            result.upDateInfo.appLink = latestAppInfo.appLink;
            result.upDateInfo.msg = latestAppInfo.message;
            result.upDateInfo.isNecessary = latestAppInfo.isNecessary;
        }

        let bannerInfo = await dao.selectBanner();

        if(utils.isNotEmpty(bannerInfo)){
            result.banner.title = bannerInfo.title;
            result.banner.msg = bannerInfo.message;
            result.banner.img = bannerInfo.img;
            result.banner.type = bannerInfo.type;
            result.banner.link = bannerInfo.link;
        }

        return result;
    }
}