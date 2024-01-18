const db=require('../../database/db');

export default async function handler(req, res) {
    try {
        console.log("gets leads function called");
        const results = await db.query('SELECT * FROM leads');
        console.log("gets leads function response:",results);
        
        await db.end();

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching leads:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
