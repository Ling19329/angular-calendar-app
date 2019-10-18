export interface IUser {
    id: number,
    firstname: string,
    lastname: string,
    dob: Date,
    email : string,
    role: string,
    is_active: string,
    created_at: Date,
    updated_at: Date,
    token?: string;
}