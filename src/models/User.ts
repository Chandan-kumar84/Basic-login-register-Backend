import mongoose,{Document,Schema} from "mongoose";

export interface USerdata extends Document{
    name:string,
    email:string,
    password:string
    
}
const userschema:Schema = new Schema<USerdata>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
    
},
{timestamps:true}
);

export const User = mongoose.model<USerdata>('User1',userschema);