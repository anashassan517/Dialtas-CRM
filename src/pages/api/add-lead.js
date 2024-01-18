// pages/api/add-lead.js
const addLead = require('../../database/addLead');

export default async function handler(req, res) {
  await addLead(req, res);
}
