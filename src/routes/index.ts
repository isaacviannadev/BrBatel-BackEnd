import { Router } from 'express';
import registerRouter from './register.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/register', registerRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
