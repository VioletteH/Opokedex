import express from "express"; 
import 'dotenv/config';
import cors from "cors";
import router from "./app/router/router.js";

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => { 
    console.log(`Example app listening on port ${PORT}`); 
}); 
