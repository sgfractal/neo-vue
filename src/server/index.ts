import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
