export class User{
    userId: string;
    userName : string;
    fullName: string;
    firstName : string;
    lastName: string;
    jobTitle: string;
    address: string;
    sex: string;
    isLoggedIn: boolean;
    role: string[];
}

export class UserCreate{
    UserName: string;
    Password : string;
    ConfirmPassword: string;
    Email : string;
    FirstName: string;
    LastName: string;
    JobTitle: string;
    Address: string;
    Sex: string;
    RoleName: string;
}