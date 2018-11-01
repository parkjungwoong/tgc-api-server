# 계획

1. 몽고 DB 기초 공부
2. DB설계
3. 인증 (Third party o-auth) 연동
4. 회원 관련 부분 개발
5. 게임 관련 부분 개발
6. 이중화 개발

## 몽고 DB

#### R-DB VS MongoDB
Table -> Collection\
Row -> Document\
Column -> Field\
PK -> object ID\
relation -> embedded or link

#### 기본 명령어

``` shell
mongo
use admin
db.auth('admin','asdf!@#$');
```

1. Create Collection
    ```shell
    db.createCollection("컬렉션 이름", { capped:fale, size:10000});
    ```
    capped 옵션 : 허용일 경우 제한 크기가 넘을경우 앞에서부터 덮어씀\
    허용이 아닐 경우 제한 크기가 넘었을 경우 어떻게되는지??

2. Insert Document
    ```shell
    db.things.insert({...});
    ```
   
3. Update Document
    ```shell
    db.things.update({name:'test'}, {$set: {age:28}});
    db.things.save({...});
    ```
    update( 조건 ), {$set : 변경값}\
    update VS save\
    update : 특정 필드만 변경시 사용 (성능상)
    save : Document단위 변경시 사용
    
4. Remove Document
    ```shell
    db.things.remove({name:'test'});
    ```
    remove( 조건 )

5. Select Document
    ```shell
    db.things.find({name:'test'});
    ```



#### 저장 형식
BSON (Binary Serial Object Notaion)\
표기는 JSON이지만 저장시에는 BSON으로 저장\
기계가 분석하고 생성하기 용이

#### 데이터 타입
