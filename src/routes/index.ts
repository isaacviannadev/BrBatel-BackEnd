import { Router } from 'express';
import registerRouter from './register.routes';

const routes = Router();

routes.use('/register', registerRouter);

export default routes;
