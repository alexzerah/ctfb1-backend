import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

export const login = async (req, res) => {

    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({message: 'Username and password are required'});
    }

    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    });

    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET, // Remplacez par votre propre secret JWT
        { expiresIn: '1h' } // Options, comme la durée de vie du token
    );

    res.status(200).json({ token });
}

export const register = async (req, res) => {

    const {username, password, email} = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({message:'Username, email and password are required'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const newUser = await prisma.user.create({
            data: {
                username: username,  // Assuming that "username" is actually an email
                password: hashedPassword,
                email: email
                // Add other fields here if necessary
            },
        });

        return res.status(201).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        // Log error and return a 500 status code
        console.error("Database error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}