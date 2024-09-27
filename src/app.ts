import express from 'express';

const webApp = express();

webApp.use(express.json());
webApp.use(express.urlencoded({ extended: true }));

export default webApp;