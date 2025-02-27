import express, { Request, Response } from 'express';
import { getUsers } from "../controllers/usercontroller";
import { createPayment, updatePaymentStatus, getPayments, getPaymentByTransactionId } from "../controllers/paymentcontroller";

const router = express.Router();

router.get("/", getUsers);

// Create a payment
router.post("/payment", createPayment);

// Update payment status
router.put("/payment/status", updatePaymentStatus as unknown as express.RequestHandler );

// Get all payments
router.get("/payments", getPayments);

// Get a payment by transactionId
router.get("/payment/:transactionId", getPaymentByTransactionId as express.RequestHandler );

export default router;