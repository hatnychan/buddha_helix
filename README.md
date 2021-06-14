# buddha_helix

## how to build

## .env
NODE_ENV=development
API_SERVER_URL=http://127.0.0.1
API_SERVER_PORT=8080
DB_TYPE=postgres
DB_HOST=db
DB_PORT=5432
DB_USER=xxxx
DB_PASS=xxxx
DB_NAME=buddha_helix_db
FIREBASE_CONFIG=./buddha-helix-firebase-adminsdk.json
GOOGLE_CLOUD_PROJECT=buddha-helix
OPEN_WEATHER_MAP_API_KEY=xxx
TWITTER_API_KEY=xxx
TWITTER_API_KEY_SECRET=xxx
### development

docker-compose -f docker-compose_dev.yml up -d

### production

docker-compose -f docker-compose_pro.yml up -d
