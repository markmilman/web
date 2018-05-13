const express = require('express');
const WorkerController = require('src/controllers/worker-controller')
let app = express();

let workerController = new WorkerController();
app.get('/api/workers', workerController.findAll);
app.post('/api/workers', workerController.findAll);

module.exports = app;
