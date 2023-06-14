import { Request, Response } from 'express';
import Beer from '../models/beer.model';

export const greeting = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World' });
};

export const getRandomBeer = async (req: Request, res: Response) => {
  try {
    const count = await Beer.countDocuments();
    const randomIndex = Math.floor(Math.random() * count);
    const randomBeer = await Beer.findOne().skip(randomIndex);

    if (!randomBeer) {
      return res.status(404).json({ error: 'No beers found' });
    }

    randomBeer.randomCount += 1;
    await randomBeer.save();
    res.status(200).json(randomBeer);

  } 
  catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  
  }
};

export const createBeer = async (req: Request, res: Response) => {
  try {

    const { uid, name, brand, style, type, yeast, hop, malts, ibu, alcohol, blg } = req.body;

    if(!uid || !name || !brand || !style || !type || !yeast || !hop || !malts || !ibu || !alcohol || !blg)
    {
      return res.status(400).json({ message: 'Failed' });
    }
    
    const existingBeer = await Beer.findOne({ uid });

    if (existingBeer) {
      return res.status(400).json({ error: 'Beer with the same UID already exists' });
    }
    
    const beer = new Beer({ uid, name, brand, style, type, yeast, hop, malts, ibu, alcohol, blg });

    await beer.save();

    return res.status(200).json({ message: 'Success' });

  } 
  catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
    
  }
};
