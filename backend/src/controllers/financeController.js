import prisma from '../lib/prisma.js';

export const listExpenses = async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({ orderBy: { createdAt: 'desc' }, take: 20 });
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch expenses' });
  }
};

export const createExpense = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const expense = await prisma.expense.create({ data: { description, amount: Number(amount), category } });
    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to create expense' });
  }
};

export const listIncome = async (req, res) => {
  try {
    const income = await prisma.income.findMany({ orderBy: { createdAt: 'desc' }, take: 20 });
    res.json(income);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch income' });
  }
};

export const createIncome = async (req, res) => {
  try {
    const { description, amount, category } = req.body;
    const incomeEntry = await prisma.income.create({ data: { description, amount: Number(amount), category } });
    res.status(201).json(incomeEntry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to create income' });
  }
};
