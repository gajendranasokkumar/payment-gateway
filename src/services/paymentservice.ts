import Payment, { IPayment } from "../models/PaymentsModel";

class PaymentService {
  // Create a new payment
  async createPayment(userId: string, amount: number, paymentMethod: string, transactionId: string): Promise<IPayment> {
    const newPayment = new Payment({
      userId,
      amount,
      paymentMethod,
      status: "pending",
      transactionId,
    });

    return await newPayment.save();
  }

  // Update payment status
  async updatePaymentStatus(transactionId: string, status: string): Promise<IPayment | null> {
    return await Payment.findOneAndUpdate(
      { transactionId },
      { status },
      { new: true }
    );
  }

  // Fetch all payments
  async getAllPayments(): Promise<IPayment[]> {
    return await Payment.find();
  }

  // Fetch a payment by transactionId
  async getPaymentByTransactionId(transactionId: string): Promise<IPayment | null> {
    return await Payment.findOne({ transactionId });
  }
}

export default new PaymentService();
