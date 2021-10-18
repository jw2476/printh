import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const { PORT } = process.env;
const app = express();
app.use(express.static("public"));
app.listen(PORT || 8000, () => {
    console.log(`http://localhost:${PORT || 8000}`);
});
//# sourceMappingURL=index.js.map