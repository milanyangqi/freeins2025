require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Initialize admin user
async function initAdminUser() {
  try {
    const admin = await prisma.user.findUnique({ where: { email: 'admin@example.com' } });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin', 10);
      await prisma.user.create({
        data: {
          email: 'admin@example.com',
          password: hashedPassword,
          name: 'Admin'
        }
      });
      console.log('Admin user created');
    }
  } catch (error) {
    console.error('Error initializing admin user:', error);
  }
}

// Auth middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// Page routes
app.get('/api/pages', async (req, res) => {
  const { locale } = req.query;
  const pages = await prisma.page.findMany({ where: { locale } });
  res.json(pages);
});

app.post('/api/pages', authMiddleware, async (req, res) => {
  const page = await prisma.page.create({ data: req.body });
  res.json(page);
});

app.put('/api/pages/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const page = await prisma.page.update({ where: { id }, data: req.body });
  res.json(page);
});

app.delete('/api/pages/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  await prisma.page.delete({ where: { id } });
  res.json({ message: 'Page deleted' });
});

// Start server
app.listen(PORT, async () => {
  console.log(`Backend server running on port ${PORT}`);
  await initAdminUser();
});