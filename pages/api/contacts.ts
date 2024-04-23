// pages/api/contacts.ts
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const response = await axios.get('https://contact.herokuapp.com/contact', {
                headers: {
                    'Accept': 'application/json'
                }
            })
            res.status(200).json(response.data)
        } catch (error: any) {
            res.status(error.response.status).json(error.response.data)
        }
    } else if (req.method === 'POST') {
        const contact: Contact = req.body

        try {
            const response = await axios.post('https://contact.herokuapp.com/contact', contact, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            res.status(201).json(response.data)
        } catch (error: any) {
            res.status((error as any).response.status).json((error as any).response.data)
        }
    } else {
        res.status(405).end() // Method Not Allowed
    }
}