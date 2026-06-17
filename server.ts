import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

// Simulated MongoDB JSON database file
const DB_PATH = path.join(process.cwd(), 'src', 'db_simulated.json');

// Helper to load db
const loadDB = () => {
  try {
    if (fs.existsSync(DB_PATH)) {
      return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
    }
  } catch (err) {
    console.error('Error loading db, resetting:', err);
  }
  return {
    contacts: [],
    testimonials: [
      {
        id: 't1',
        clientName: 'Alexander Hayes',
        role: 'Product Director',
        company: 'Synergy Labs',
        feedbackText: 'Working with Sadaf was an absolute pleasure. They took our custom design prototypes and engineered a pixel-perfect, hyper-fast e-commerce experience on Vercel. Highly recommended for creative UI/UX!',
        rating: 5,
      },
      {
        id: 't2',
        clientName: 'Amina Mansoor',
        role: 'Principal Executive',
        company: 'Gogera Academic Council',
        feedbackText: 'Sadaf developed the Al-Manzoor system portal within a tight deadline. The neon-ambient interface was custom tailored to make our administrative information stand out incredibly well on mobile tools!',
        rating: 5,
      },
      {
        id: 't3',
        clientName: 'Klaus Reinhardt',
        role: 'Founder',
        company: 'Aurelius Gastro',
        feedbackText: 'Exceptional Express.js, MongoDB, and React performance skills. Sadaf built both our food catalog application and design gallery with robust grid adapters. The custom transitions on navigation are world-class!',
        rating: 5,
      }
    ],
    db_status: {
      status: 'connected',
      host: 'mongodb+srv://sadaf-ameer-cluster.gcp.mongodb.net',
      port: 27017,
      databaseName: 'sadaf_portfolio_db',
      dbType: 'MongoDB Atlas (GCP Serverless Instance)',
      connectionsCount: 8,
      queryLatency: '14ms',
      lastSync: new Date().toISOString()
    }
  };
};

const saveDB = (db: any) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error saving db:', err);
  }
};

// Initialize db file if not exists
if (!fs.existsSync(DB_PATH)) {
  saveDB(loadDB());
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // REST API Endpoints
  // MongoDB Connection Info and logs
  app.get('/api/mongodb/status', (req, res) => {
    const db = loadDB();
    res.json({
      ...db.db_status,
      collections: {
        contacts: db.contacts.length,
        testimonials: db.testimonials.length
      },
      systemLogs: [
        { timestamp: new Date(Date.now() - 3600000).toISOString(), type: 'info', message: 'MongoDB client initialized.' },
        { timestamp: new Date(Date.now() - 1800000).toISOString(), type: 'info', message: 'Connected to MongoDB Cluster replicaSet.' },
        { timestamp: new Date().toISOString(), type: 'success', message: 'DB Sync Complete. Performance indices normal.' }
      ]
    });
  });

  // GET Testimonials (simulating db.collection('testimonials').find())
  app.get('/api/testimonials', (req, res) => {
    const db = loadDB();
    res.json(db.testimonials);
  });

  // POST Testimonial (simulating db.collection('testimonials').insertOne())
  app.post('/api/testimonials', (req, res) => {
    const db = loadDB();
    const { clientName, role, company, feedbackText, rating } = req.body;
    if (!clientName || !feedbackText) {
      return res.status(400).json({ error: 'Name and feedback content is required.' });
    }
    const newFeedback = {
      id: 't_' + Date.now(),
      clientName,
      role: role || 'Partner / Client',
      company: company || 'International Enterprise',
      feedbackText,
      rating: Number(rating) || 5
    };
    db.testimonials.push(newFeedback);
    db.db_status.lastSync = new Date().toISOString();
    saveDB(db);
    res.status(201).json({ success: true, message: 'Document inserted into custom MongoDB successfully.', document: newFeedback });
  });

  // POST Contact (simulating db.collection('contacts').insertOne())
  app.post('/api/contact', (req, res) => {
    const db = loadDB();
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Required fields missing: Name, email, message.' });
    }
    const newContact = {
      _id: 'doc_' + Date.now(),
      name,
      email,
      subject: subject || 'General Consultation',
      message,
      createdAt: new Date().toISOString()
    };
    db.contacts.push(newContact);
    db.db_status.lastSync = new Date().toISOString();
    saveDB(db);
    res.status(201).json({ success: true, message: 'Form submitted. Document inserted into MongoDB contacts successfully.', insertedId: newContact._id });
  });

  // Gemini Chatbot Integration
  app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message payload is required.' });
    }

    // Check if GEMINI_API_KEY is present
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      try {
        // Lazy import @google/genai as requested, to avoid startup issues
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey: geminiKey });
        const prompt = `You are the exclusive luxury chatbot agent for Sadaf Ameer (Legal Name: Sadaf Bibi).
Sadaf is a premium web systems developer specializing in Express.js, MongoDB, Next.js, and API Integration (NOT PHP).
She crafts elite high-fidelity web systems for clients in Pakistan, UAE, Saudi Arabia, Qatar, and Gulf regions.

Here is the user message: "${message}"

Respond concisely in an elegant, professional, highly luxury tone. Highlight her MongoDB & Express.js full-stack capabilities, custom database structures, and high performance metrics. Avoid any mention of PHP as she doesn't use it anymore. keep answers within 2-3 sentences.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt
        });
        return res.json({ reply: response.text });
      } catch (err: any) {
        console.error('Gemini error:', err);
      }
    }

    // Fallback high-fidelity chatbot responses if Gemini key is missing
    const normalizedInput = message.toLowerCase();
    let replyText = '';
    if (normalizedInput.includes('hello') || normalizedInput.includes('hi') || normalizedInput.includes('hey') || normalizedInput.includes('marhaban')) {
      replyText = "Marhaban! I am Sadaf's elite AI Assistant. How can I assist you with modern full-stack systems containing Express.js & MongoDB today?";
    } else if (normalizedInput.includes('skill') || normalizedInput.includes('tech') || normalizedInput.includes('code') || normalizedInput.includes('db')) {
      replyText = "Sadaf specializes in premium web stacks: Node.js, Express.js, MongoDB, TypeScript, Next.js/React, and custom APIs. All custom databases are decoupled and secure.";
    } else if (normalizedInput.includes('project') || normalizedInput.includes('suitable') || normalizedInput.includes('work') || normalizedInput.includes('database')) {
      replyText = "Sadaf has built stunning interactive platforms including Markazz Shop, Hamme Administration System (Express/MongoDB), and custom REST APIs for extreme performance.";
    } else if (normalizedInput.includes('contact') || normalizedInput.includes('whatsapp') || normalizedInput.includes('start') || normalizedInput.includes('hire')) {
      replyText = "You can connect instantly with Sadaf via WhatsApp (+923295806515), on LinkedIn, or by filling out the Contact Form. Sadaf accommodates GCC schedules including Riyadh and Dubai.";
    } else if (normalizedInput.includes('php')) {
      replyText = "Sadaf has migrated completely to elite modern stacks (Express.js, MongoDB, Node, Next.js) and does not deploy with legacy PHP architectures anymore.";
    } else {
      replyText = "Thank you for reaching out! Sadaf's portfolio is backed by a live Express.js server and simulated MongoDB cloud cluster. For custom quotes, please submit the Contact Form or message via WhatsApp (+923295806515).";
    }
    res.json({ reply: replyText });
  });

  // Serve compiled static index file / developers static pages
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Elite Full-Stack Server] running on http://localhost:${PORT}`);
  });
}

startServer();
