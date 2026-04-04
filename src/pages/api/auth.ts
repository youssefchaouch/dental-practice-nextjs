import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  const { email, password } = req.body;
  if (
    email === process.env.DENTIST_EMAIL &&
    password === process.env.DENTIST_PASSWORD
  ) {
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ success: false });
}
