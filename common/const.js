module.exports = {

    DEFAULT_LIMIT : 5,

    //================== 서버 응답 관련 고정 변수 ==================
    SUCCESS : {
        code : '0000',
        message : '정상처리 되었습니다.'
    },

    FAIL : {
        code : 'E0001',
        message : '처리중 오류가 발생했습니다.'
    },

    USER_NOT_FOUND : {
        code : 'U002',
        message: '회원 정보 불일치'
    }
}