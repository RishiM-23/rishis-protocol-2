const { MongoClient } = require('mongodb');


const uri = process.env.MONGODB_URI;


const options = {};


let client;

let clientPromise;


// --- Connection Caching for Serverless ---

if (!process.env.MONGODB_URI) {

  throw new Error('Please add your Mongo URI to .env.local');

}


if (process.env.NODE_ENV === 'development') {

  // In development mode, use a global variable so the value

  // is preserved across module reloads caused by HMR (Hot Module Replacement).

  if (!global._mongoClientPromise) {

    client = new MongoClient(uri, options);

    global._mongoClientPromise = client.connect();

  }

  clientPromise = global._mongoClientPromise;

} else {

  // In production mode, it's best to not use a global variable.

  client = new MongoClient(uri, options);

  clientPromise = client.connect();

}


// --- API Handler ---

module.exports = async function handler(req, res) {

  try {

    const client = await clientPromise;

    const db = client.db('rishi_protocol_db');

    const collection = db.collection('user_data');


    // 1. Handle POST (Saving Data)

    if (req.method === 'POST') {

      const { data, passcode } = req.body;


      if (!passcode || !data) {

        return res.status(400).json({ error: 'Missing data or passcode' });

      }


      // Upsert: Update if exists, Insert if new

      await collection.updateOne(

        { _id: passcode },

        { $set: { data, lastUpdated: new Date() } },

        { upsert: true }

      );


      return res.status(200).json({ message: 'Synced successfully' });

    }


    // 2. Handle GET (Loading Data)

    else if (req.method === 'GET') {

      const { passcode } = req.query;


      if (!passcode) {

        return res.status(400).json({ error: 'Passcode required' });

      }


      const doc = await collection.findOne({ _id: passcode });


      if (doc) {

        return res.status(200).json(doc.data);

      } else {

        // If no data exists yet, return an empty object so the frontend doesn't crash

        return res.status(200).json({});

      }

    }


    // 3. Handle Other Methods

    else {

      res.setHeader('Allow', ['POST', 'GET']);

      return res.status(405).end(`Method ${req.method} Not Allowed`);

    }


  } catch (e) {

    console.error(e);

    return res.status(500).json({ error: e.message });

  }

};
