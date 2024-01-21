export default interface IUser {
    name: string
    email: string
    picture?: string
    typeLogin: 'google' | 'email' | 'github' | 'facebook' | 'twitter' | 'linkedin'
    password?: string
    id?: string
}