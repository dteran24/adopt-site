import { hashPassword } from "@/app/lib/auth";
import { connectToDatabase } from "@/app/lib/db";
import { NextApiResponse, NextApiRequest } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password } = data;

    if (!email || !email.includes("@") || !password || password.trim() < 7) {
      res
        .status(422)
        .json({
          message: "Invalid Input = Password must contain 7 characters.",
        });
      return;
    }
    const client = await connectToDatabase();
    const hashedPassword = hashPassword(password);

    const db = client.db();

    const result = await db.collection("users").insertOne({
      email: email,
      passsword: hashedPassword,
    });

    res.status(201).json({ message: "Created User!" });
  }
};

export default handler;
