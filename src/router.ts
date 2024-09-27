import express from 'express';
import taskRoutes from './modules/task';

const main_router = express.Router();

main_router.use('/task', taskRoutes);

export default main_router;