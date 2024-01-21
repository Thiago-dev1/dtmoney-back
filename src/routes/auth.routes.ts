import { Router } from "express"
import { OAuth2Client } from 'google-auth-library'

import { CreateUserController } from "../modules/users/useCase/createUser/CreateUserController"

const client = new OAuth2Client()

const authRoutes = Router()

authRoutes.post("/google", async (request, response) => {
    try {
        const { credential } = request.body

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const { name, email, picture } = ticket.getPayload()

        const createUserController = new CreateUserController()

        await createUserController.handle({ email, name, typeLogin: "google", password: "", picture })
    } catch (error) {
        console.log(`[authRoutes] -> [post] -> [google] -> ${error}`)  
        if(error.message === "User already exists") {
            return response.status(200).json({message: error.message})
        }
    }

})

export { authRoutes }

