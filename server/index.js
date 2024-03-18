import express from "express";
import initialize from "./app.js";
import Logger from 'node-json-logger';
const logger = new Logger();
const app = express()
const port = 3000



initialize(app);

app.listen(port, () => {
  logger.info(`Network cloud demo app listening on port ${port}`)
})