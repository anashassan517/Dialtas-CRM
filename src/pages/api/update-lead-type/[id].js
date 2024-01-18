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
    const { id } = req.query;
  
    if (req.method === 'PUT') {
      try {
        const { newLeadType } = req.body;
  
        // Update the lead type in the 'leads' table
        await db.query('UPDATE leads SET leadType = ? WHERE id = ?', [newLeadType, id]);
  
        res.status(200).json({ message: 'Lead type updated successfully' });
      } catch (error) {
        console.error('Error updating lead type:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }