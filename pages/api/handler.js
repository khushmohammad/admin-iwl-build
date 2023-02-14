import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  const token = await getToken({ req, secret, encryption: true });
  res.status(200).json({
    body: req.body,
    query: req.query,
    cookies: req.cookies,
    token: token.user,
  });
}
