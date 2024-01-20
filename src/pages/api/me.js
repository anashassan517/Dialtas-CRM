const getUserData = require('../../database/getUserData')

export default async function handler(req, res) {
  await getUserData(req, res);
}