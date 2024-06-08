import express from 'express';
import stripeRoutes from './routes/stripe'; // Add missing import statement

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/stripe', stripeRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
