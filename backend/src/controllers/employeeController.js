import prisma from '../lib/prisma.js';

export const listEmployees = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to fetch employees' });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, phone, email, position, salary } = req.body;
    const employee = await prisma.employee.create({
      data: { name, phone, email, position, salary: Number(salary || 0) },
    });
    res.status(201).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to create employee' });
  }
};
