require('dotenv').config();
import express from 'express';
import api from './api';

const app = express();

app.use(express.json());

// serve public folder for apidoc
app.use(express.static('public'));

app.use('/api/v1', api);

export default app;
