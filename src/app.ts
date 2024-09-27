import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import middleware from './middleware';
import main_router from './router';

const webApp = express();

webApp.use(express.json());
webApp.use(express.urlencoded({ extended: true }));
webApp.use(cors());
webApp.use(helmet());
webApp.use(morgan('dev'));

webApp.use('/health-check', middleware.health_check);
webApp.use('/api/v1/', main_router)
webApp.use('*', middleware.catch_all);
webApp.use(middleware.error_handler);

export default webApp;