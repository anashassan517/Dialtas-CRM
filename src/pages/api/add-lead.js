const mysql = require('serverless-mysql');


const db=mysql({
    config:{
        host:"localhost",
        user:"root",
        database:"dialtas",
        password:"xgen",
        port:3306
    }
});


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { organization, opportunity, email, phone, expectedRevenue, priority } = req.body;

      // Insert the new lead into the 'leads' table

      const result = await db.query(
        'INSERT INTO leads (organization, opportunity, email, phone, expectedRevenue, priority) VALUES (?, ?, ?, ?, ?, ?)',
        [organization, opportunity, email, phone, expectedRevenue, priority]
      );

      const newLeadId = result.insertId;

      // Send the new lead data as a response
      res.status(201).json({ id: newLeadId, organization, opportunity, email, phone, expectedRevenue, priority });
    } catch (error) {
      console.error('Error adding new lead:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
