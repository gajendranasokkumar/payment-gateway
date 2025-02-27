import mongoose, { Schema, Document } from "mongoose";

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  paymentMethod: string;
  status: string; // e.g. 'pending', 'completed', 'failed'
  transactionId: string;
  date: Date;
}

const PaymentSchema = new Schema<IPayment>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: "pending" },
  transactionId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model<IPayment>("Payment", PaymentSchema);
