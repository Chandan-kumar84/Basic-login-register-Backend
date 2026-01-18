import dotenv  from 'dotenv';
dotenv.config();


import app from './app';
import { connectdb } from './config/db';
 

const port = process.env.PORT || 5700;
const MONGO_URI:any= process.env.MONGO_URI;


async function s() {
    await connectdb(MONGO_URI);
    app.listen(port, () => {
        console.log(`Server is running on port 5700`);
    });
}
s();
