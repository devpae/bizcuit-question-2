import mongoose, { Document } from 'mongoose';

interface IBeer extends Document {
  uid: string;
  brand: string;
  name: string;
  style: string;
  hop: string;
  yeast: string;
  malts: string;
  ibu: string;
  alcohol: string;
  blg: string;
  randomCount: number;
}

const beerSchema = new mongoose.Schema<IBeer>({
  uid: { type: String, required: true },
  brand: { type: String, required: true },
  name: { type: String, required: true },
  style: { type: String, required: true },
  hop: { type: String, required: true },
  yeast: { type: String, required: true },
  malts: { type: String, required: true },
  ibu: { type: String, required: true },
  alcohol: { type: String, required: true },
  blg: { type: String, required: true },
  randomCount: { type: Number, default: 0 },
},{ versionKey: false });

export default mongoose.model<IBeer>('Beer', beerSchema);
