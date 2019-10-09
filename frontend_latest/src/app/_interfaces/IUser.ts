export interface IUser {
    id: number,
    firstname: string,
    lastname: string,
    dob: Date,
    email : string,
    role: string,
    created_at: Date,
    updated_at: Date
    token?: string;
}