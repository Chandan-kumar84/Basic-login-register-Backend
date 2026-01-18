import express from 'express';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());
app.get("/",(req,res) =>{
    res.send("api working");
})

app.use("/api/auth",authRoutes);

export default app;
