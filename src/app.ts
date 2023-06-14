import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as beerController from './controllers/beer.controller';


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

console.log("Connecting MongoDB...");

// Connect to the MongoDB database
mongoose.connect(process.env.MONGODB_URI!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions);

// Parse JSON bodies
app.use(express.json());

// Define routes
app.get('/', beerController.greeting);
app.get('/beer/random', beerController.getRandomBeer);
app.post('/beer', beerController.createBeer);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
