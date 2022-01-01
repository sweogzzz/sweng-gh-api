docker build -t sample .
docker run \
-it \
--rm \
-p 3000:3000 \
-e CHOKIDAR_USEPOLLING=true \
sample