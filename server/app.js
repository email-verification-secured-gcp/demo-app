import cors from 'cors';
import express from 'express';
import registerRouter from './routes/index.js';
import nocache from 'nocache';


const initialize = (app) => {
    app.use(cors());
    app.use(express.json());

    app.use(async (err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            return res.status(400).send();
        }
    });
    app.use(nocache());
    registerRouter(app);

}

export default initialize;