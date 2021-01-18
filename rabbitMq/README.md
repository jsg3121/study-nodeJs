```shell
docker run -d \
--name rabbitmq \
-p 5672:5672 \
-p 8080:15672 \
-p 1883:1883 \
--restart=unless-stopped \
-e RABBITMQ_DEFAULT_USER=quber \
-e RABBITMQ_DEFAULT_PASS=quber! \
quber-rabbitmq
```



## users

| TAG           | ID     | PASSWORD | 비고                            |
| ------------- | ------ | -------- | ------------------------------- |
| administrator | quber  | quber!   | 관리자 페이지 접속이 가능하다   |
| administrator | quber2 | quber2!  | 최초 생성시 No access 로 표기됨 |
|               |        |          |                                 |

