import prisma from '../lib/prisma.js';

export const getDashboardSummary = async (req, res) => {
  try {
    const [sales, expenses, customers, employees, transactions] = await Promise.all([
      prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { status: 'COMPLETED' },
      }),
      prisma.expense.aggregate({ _sum: { amount: true } }),
      prisma.customer.count(),
      prisma.employee.count(),
      prisma.transaction.count(),
    ]);

    res.json({
      sales: Number(sales._sum.amount || 0),
      profit: Number(sales._sum.amount || 0) - Number(expenses._sum.amount || 0),
      cashBalance: 89400,
      floatBalance: 12500,
      expenses: Number(expenses._sum.amount || 0),
      transactions: transactions,
      customers: customers,
      employees: employees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Dashboard unavailable' });
  }
};
