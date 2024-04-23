// pages/api/contact/[id].ts
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // Get the id from the route
        const id = req.query.id as string;

        // Fetch the contact from the external API
        const response = await axios.get(`https://contact.herokuapp.com/contact/${id}`);
        const contact = response.data;

        res.status(200).json(contact)
    } else if (req.method === 'DELETE') {
        // Delete the contact from your database here
        // For now, we'll return a success message
        res.status(200).json({ message: 'Contact deleted' })
    } else if (req.method === 'PUT') {
        // Update the contact in your database here
        // For now, we'll return the same data that was posted
        res.status(200).json(req.body)
    } else {
        res.status(405).end() // Method Not Allowed
    }
}

