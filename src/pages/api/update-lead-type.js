// pages/api/update-lead-type.js

const executeQuery=require('../../database/executeQuery')

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    try {
      const { leadId, newLeadType } = req.body;

      const result = await executeQuery({
        query: 'UPDATE leads SET leadType = ? WHERE id = ?',
        values: [newLeadType, leadId],
      });

      if (result.affectedRows === 1) {
        return res.status(200).json({ message: 'Lead type updated successfully' });
      } else {
        return res.status(404).json({ error: 'Lead not found' });
      }
    } catch (error) {
      console.error('Error updating lead type:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
