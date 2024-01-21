import IUser from "../../../models/interfaces/IUser";

interface IUserRepository {
    create({email, name, typeLogin, password, picture}: IUser): Promise<void>
    findByEmail(email: string): Promise<IUser>

}

export { IUserRepository };

