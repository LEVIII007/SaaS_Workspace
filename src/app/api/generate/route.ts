// Import `GoogleGenerative` from the package we installed earlier.
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
import { dot } from "node:test/reporters";

dotenv.config();

// Create an asynchronous function POST to handle POST 
// request with parameters request and response.
export async function POST(req : any, res : any) {

    try {
        // Access your API key by creating an instance of GoogleGenerativeAI we'll call it GenAI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)

        // Ininitalise a generative model
        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        // Retrieve the data we recieve as part of the request body
        const data = await req.json()

        // Define a prompt varibale
        const system = `you are a helpful assitance within a document workspace editor. help the user with their writing according to the context of the document.`
        const prompt = system + " ->  " + data.body

        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(prompt)
        const response = await result.response;
        const output = await response.text();

        // Send the llm output as a server reponse object
        return NextResponse.json({ output: output })
    } catch (error) {
        console.error(error)
    }
}
