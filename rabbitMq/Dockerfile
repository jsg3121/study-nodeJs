FROM rabbitmq:3.8.9

ENV RABBITMQ_VERSION=3.8.9

RUN rabbitmq-plugins enable --offline rabbitmq_management
RUN rabbitmq-plugins enable --offline rabbitmq_mqtt
RUN rabbitmq-plugins enable --offline rabbitmq_web_mqtt
RUN rabbitmq-plugins enable --offline rabbitmq_prometheus
RUN rabbitmq-plugins enable --offline rabbitmq_auth_backend_oauth2
# Fix nodename
RUN echo 'NODENAME=rabbit@localhost' > /etc/rabbitmq/rabbitmq-env.conf


EXPOSE 15672
EXPOSE 15675
EXPOSE 15692
EXPOSE 1883
EXPOSE 8883

# 실행 명령어
# docker run -d --name rabbitmq -p 5672:5672 -p 8080:15672 -p 1883:1883 --restart=unless-stopped -e RABBITMQ_DEFAULT_USER=test1 -e RABBITMQ_DEFAULT_PASS=test1 rabbitmq