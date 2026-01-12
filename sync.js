import { MongoClient } from 'mongodb';

// Get the connection string from environment variables
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  // If the database connection string is missing, return an error
  if (!uri) {
    return res.status(500).json({ error: 'Database configuration missing' });
  }

  try {
    // Connect to the client
    await client.connect();
    const db = client.db('rishi_protocol_db'); // Name of your database
    const collection = db.collection('user_data'); // Name of your collection

    // Handle POST requests (Saving Data)
    if (req.method === 'POST') {
      const { data, passcode } = req.body;

      if (!passcode || !data) {
        return res.status(400).json({ error: 'Missing data or passcode' });
      }

      // Update the document with the matching passcode, or create it if it doesn't exist
      await collection.updateOne(
        { _id: passcode }, // The document ID is the passcode
        { $set: { data, lastUpdated: new Date() } },
        { upsert: true }
      );

      return res.status(200).json({ message: 'Saved successfully' });
    } 
    
    // Handle GET requests (Loading Data)
    else if (req.method === 'GET') {
      const { passcode } = req.query;

      if (!passcode) {
        return res.status(400).json({ error: 'Passcode required' });
      }

      const doc = await collection.findOne({ _id: passcode });

      if (doc) {
        return res.status(200).json(doc.data);
      } else {
        return res.status(404).json({ message: 'No data found for this passcode' });
      }
    } 
    
    // Handle unsupported methods
    else {
      res.setHeader('Allow', ['POST', 'GET']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  } finally {
    // Ideally, we'd keep the connection open in serverless, 
    // but for simplicity and safety, we close it or let the platform handle it.
    // In Vercel serverless, closing is often handled automatically or cached.
    // We'll leave it open for reuse in this simple example.
  }
}
