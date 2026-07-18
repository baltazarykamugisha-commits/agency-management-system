import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';

async function seedAdmin() {
  const existing = await prisma.user.findUnique({ where: { username: 'admin' } });

  if (!existing) {
    const passwordHash = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        username: 'admin',
        email: 'admin@agency.com',
        passwordHash,
        fullName: 'System Administrator',
      },
    });
  }

  console.log('Admin seed complete');
}

seedAdmin()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
