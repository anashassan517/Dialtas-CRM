// addLead.js
const executeQuery = require('./executeQuery');

const addLead = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { organization, opportunity, email, phone, expectedRevenue, priority } = req.body;

      const result = await executeQuery({
        query: 'INSERT INTO leads (organization, opportunity, email, phone, expectedRevenue, priority) VALUES (?, ?, ?, ?, ?, ?)',
        values: [organization, opportunity, email, phone, expectedRevenue, priority],
      });

      const newLeadId = result.insertId;

      return res.status(201).json({ id: newLeadId, organization, opportunity, email, phone, expectedRevenue, priority });
    } catch (error) {
      console.error('Error adding new lead:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

module.exports = addLead;
