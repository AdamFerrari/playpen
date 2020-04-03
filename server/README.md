# Playpen server
A super simple express app on top of postgresql.

TO-DO:
* Document DB setup



Setup:
* npm install
* PORT=3002 npm start


Example:
```
curl -d "@sample_post.json" -H "Content-Type: application/json" -X POST http://localhost:3002/messages/create
```
