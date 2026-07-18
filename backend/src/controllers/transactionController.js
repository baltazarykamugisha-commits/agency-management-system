import prisma from '../lib/prisma.js';

export const listTransactions = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch transactions' });
  }
};

export const createTransaction = async (req, res) => {
  try {
    const { reference, type, amount, status = 'COMPLETED', channel, description } = req.body;
    const transaction = await prisma.transaction.create({
      data: {
        reference,
        type,
        amount: Number(amount),
        status,
        channel,
        description,
      },
    });
    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to create transaction' });
  }
};
