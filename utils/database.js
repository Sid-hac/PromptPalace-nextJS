
import mongoose from "mongoose";

 let isConnected = false;

 export const connectToDB = async () => {

    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("mongodb is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.NEXT_MONGODB_URI, {
            dbName:"share-Prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        isConnected = true;
        console.log("mongodb connection established");
        
    }catch (error) {
        console.log(error);
    }
 }