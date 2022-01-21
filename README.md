# forum-app

Before you get started make sure to install Vue and MongoDb on your environment.
1. Mongo instructions: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
2. Vue instructions: https://cli.vuejs.org/


After Cloning the repository run the following commands to get started.

1. Api setup
```
cd backend
npm install
npm run dev
```

2. .env variables
Create an .env file in backend folder. It should look like this:
```
MONGO_URI={mongo db connection string}
TOKEN_KEY=someJWTAuthenticationKey
```

3. Frontend setup
```
cd frontend
npm install
npm run serve
```
