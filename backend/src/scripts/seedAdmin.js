import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';

async function seedAdmin() {
  const username = process.env.INITIAL_ADMIN_USERNAME || 'admin';
  const existing = await prisma.user.findUnique({ where: { username } });

  if (!existing) {
    const password = process.env.INITIAL_ADMIN_PASSWORD;

    if (!password) {
      throw new Error('INITIAL_ADMIN_PASSWORD is required to create the first administrator.');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
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
