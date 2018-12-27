module.exports = {

    DEFAULT_LIMIT : 5,

    //회원 상태
    USER_STATE : {
        NORMAL : '00',
        WITHDREW : '99'
    },

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
        code : 'U001',
        message: '회원 정보 불일치'
    },

    NOT_SUPPORTED_LOGIN_TYPE : {
        code : 'U002',
        message: '지원하지 않는 로그인 형식'
    },

    USER_STATE_IS_WITHDREW : {
        code : 'U003',
        message: '탈퇴한 회원'
    },

    USER_STATE_NOT_NORMAL : {
        code : 'U004',
        message: '회원 상태값 알수없음'
    }
}