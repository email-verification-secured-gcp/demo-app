import healthRouter from './health-route.js';
import userRouter from './user-route.js';
import veirfyRouter from "./verify-route.js";
export default (app) => {
    app.use('/healthz',healthRouter);
    app.use('/v1/user',userRouter);
    app.use('/verify-email',veirfyRouter);
}   