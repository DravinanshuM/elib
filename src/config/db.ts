import mongoose from 'mongoose';
import { config } from './config';

const connectionDB = async () => {
    try {
        mongoose.connection.once("open", () => {
            console.log(`Connected to database successfully`);
        });

        mongoose.connection.once('error', (err) => {
            console.error(`Error in connecting to database ${err}`);
        });
        
        await mongoose.connect(config.dataBaseURL as string);
    } catch (error) {
        console.error("Failed to connect to database");
        process.exit(1);
    }
}

export default connectionDB;
