import { Response } from "express";

export function ok (res: Response,message: string ,data?: any) {
    return res.status(200).json({message,data});
}
export function created (res: Response,message: string ,data?: any) {
    return res.status(201).json({message,data});
}

export function bad(res: Response,message: string ,data?: any) {
    return res.status(400).json({message});
}
export function unauthorized(res: Response,message: string ,data?: any) {
    return res.status(401).json({message});
}