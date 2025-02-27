import { Request, Response } from "express";
import PaymentService from "../services/paymentservice";

// Create a new payment
export const createPayment = async (req: Request, res: Response) => {
  const { userId, amount, paymentMethod, transactionId } = req.body;
  try {
    const payment = await PaymentService.createPayment(userId, amount, paymentMethod, transactionId);
    res.status(201).json({ message: "Payment created", data: payment });
  } catch (err) {
    res.status(500).json({ error: "Failed to create payment", details: (err as Error).message });
  }
};

// Update payment status
export const updatePaymentStatus = async (req: Request, res: Response): Promise<Response> => {
  const { transactionId, status } = req.body;
  try {
    const updatedPayment = await PaymentService.updatePaymentStatus(transactionId, status);
    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json({ message: "Payment status updated", data: updatedPayment });
  } catch (err) {
    return res.status(500).json({ error: "Failed to update payment status", details: (err as Error).message });
  }
};

// Fetch all payments
export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await PaymentService.getAllPayments();
    res.status(200).json({ data: payments });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payments", details: (err as Error).message });
  }
};

// Fetch a payment by transactionId
export const getPaymentByTransactionId = async (req: Request, res: Response) => {
  const { transactionId } = req.params;
  try {
    const payment = await PaymentService.getPaymentByTransactionId(transactionId);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ data: payment });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch payment", details: (err as Error).message });
  }
};