require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

(async () => {
  const username = 'admin';
  const email = 'admin';
  const password = 'admin';
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: { email, password: hashedPassword, name: username }
  });
  console.log('已插入admin账号');
  process.exit(0);
})(); 