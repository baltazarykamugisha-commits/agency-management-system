import prisma from '../lib/prisma.js';

export const listCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch customers' });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;
    const customer = await prisma.customer.create({
      data: { name, phone, email, address },
    });
    res.status(201).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to create customer' });
  }
};
