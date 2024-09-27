import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import middleware from './middleware';

const webApp = express();

webApp.use(express.json());
webApp.use(express.urlencoded({ extended: true }));
webApp.use(cors());
webApp.use(helmet());
webApp.use(morgan('dev'));

webApp.use('/health-check', middleware.health_check);
webApp.use('*', middleware.catch_all);
webApp.use(middleware.error_handler);

// webApp.listen(3000, () => console.info('Server started listening on port', 3000));

export default webApp;