import express from "express"; 
import 'dotenv/config';
import cors from "cors";
import router from "./app/router/router.js";
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.use((req, res) => {
    res.send("Not Found"); 
});

// app.listen(PORT, () => { 
//     console.log(`Example app listening on port ${PORT}`); 
// }); 

if (process.env.NODE_ENV !== 'test') { 
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

export default app;
