import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

export default async (req, res) => {
  const token = await getToken({ req, secret, encryption: true });
  // console.log(token);
  if (token) {
    // Signed in
    // console.log("JSON Web Token", JSON.stringify(token, null, 2));
    res.status(200).json(token.user);
  } else {
    // Not Signed in
    res.status(401);
  }
  res.end();
};
