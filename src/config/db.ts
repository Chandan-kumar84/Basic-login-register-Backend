import mongoose from "mongoose";

export async function connectdb(uri:string) {
    try {
        await mongoose.connect(uri);
        console.log("mongodb connected")
    } catch(err) {
        console.error(err);
    }
}