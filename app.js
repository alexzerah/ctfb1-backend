import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

import authRouter from './routes/auth.route.js';
import indexRouter from './routes/index.route.js';

const verifyJWT = () => {
    return (req, res, next) => {
        const token = req.headers['x-access-token'];
        console.log(token);
        if (!token) {
            return res.status(401).json({ auth: false, message: 'No token provided.' });
        }
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
            }
            // Si tout est bon, enregistre le jeton dans la requête et passe à l'étape suivante.
            req.userId = decoded.id;
            next();
        });
    }
}

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/api', verifyJWT() , indexRouter);
app.use((req, res, next) => {
    res.status(404).json({message:'Not Found', method:req.method, url:req.url});
})

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

export default server;
