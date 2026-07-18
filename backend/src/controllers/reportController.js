import prisma from '../lib/prisma.js';

export const getReports = async (req, res) => {
  try {
    const [transactions, expenses, income, customers, employees] = await Promise.all([
      prisma.transaction.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
      prisma.expense.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
      prisma.income.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
      prisma.customer.count(),
      prisma.employee.count(),
    ]);

    res.json({
      transactions,
      expenses,
      income,
      counts: {
        customers,
        employees,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to generate reports' });
  }
};
