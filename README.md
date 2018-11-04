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
    여러 개의 도큐먼트를 Update경우 {multi : true} 옵션 필요 (몽고는 기본적으로 조건을 만족하는 첫번째 문서만 update)
    
4. Remove Document
    ```shell
    db.things.remove({name:'test'});
    ```
    remove( 조건 )

5. Select Document
    ```shell
    db.things.find({name:'test'});
    find(조건)
    db.things.find({name:'test'}, {name:1,age:1,_id:0});
    -> select name,age from things where name = 'test'
    (tip) _id항목은 기본으로 조회됨, 성능 향상을 위해 _id:0 추가하면 좋음
    ```

#### 저장 형식
BSON (Binary Serial Object Notaion)\
표기는 JSON이지만 저장시에는 BSON으로 저장\
기계가 분석하고 생성하기 용이

#### 데이터 타입
 * Ojbect ID : 컬렉션 당 타 도큐먼트와 구별과는 유일 키 (12바이트 바이너리값), 사용자 정의 가능
 * 18가지의 데이터 속성, 타입 네임과 타입 넘버 쌍으로 구분 가능
 
#### 연산자
|연산자|설명|
|:---:|:---:|
$cmp| 앞의값이 작으면 음수, 크면 양수, 같으면 0
$eq| ' = '
$gt| ' > '
$gte| ' >= '
$lt| ' < '
$lte| ' <= '
$ne| ' != '
boolean 연산자 | $and, $or, $not, $in, $all, $exists
* 이외 문자열 및 다른 연산자 있음
* [연산자 정리 링크](https://www.slideshare.net/niddo/mongo-d-b)\
  페이징 관련 설명 : 27페이지

* 빅데이터 쿼리를 위한 연산자도 제공\
  aggregation을 사용하면 내부적으로 MapReduce를 사용하여 빠른 성능을 보장
  $limit, $group, ,$sum, $sort, $match, 등 사용가능
  
#### javascript 함수
 * 프로시져 처럼 함수를 정의하여 사용가능
     ```shell
     //비저장
     function test() { db.test.find(); db.test.remove({}) }
     db.eval( test )
     
     //저장
     db.system.js.save( { _id : 'test', value : function(){...} } )
     db.system.js.find() // 저장 확인
     db.eval( test )
     ```
#### LOCK 정책
 todo : 더 알아보기
 
#### 고립 정책
 Read UnCommitted 형태로 갱신 작업이 있으면 오토 커밋으로 사용자는 항상 변경 후 데이터를 본다.\
 $isolated 연산자 있는데 더 알아봐야됨!
 
#### Transaction 방법
 transcation 컬렉션을 만들어서 상태값에 따라서 조회후 액션을 취하는 식으로 사용하는듯
 
#### 인덱스 생성 및 관리

#### 모델링



