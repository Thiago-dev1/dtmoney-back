import { Request, Response, Router } from "express"


import { verifyGoogleToken } from "../middlewares/verifyGoogleToken"
import { CreateUserController } from "../modules/users/useCase/createUser/CreateUserController"
import { generateToken } from "../services/generateToken"

const authRoutes = Router();
const createUserController = new CreateUserController()

authRoutes.post("/google", verifyGoogleToken,  (request: Request, response: Response): void => {
    loginGoogle(request, response)
});

async function loginGoogle(request: Request, response: Response): Promise<void> {
    const { name, email, picture } = request.userGoogle // Assume that verifyGoogleToken middleware adds user to request.

    try {
      const user =  await createUserController.handle({ email, name, typeLogin: "google", password: "", picture })
        const token = generateToken(user.email, user._id)
        response.status(201).json({ token, user: { name, email, picture } })
    } catch (error) {
        console.error(`[authRoutes] -> [post] -> [google] -> ${error}`)
    }
}

export { authRoutes }

