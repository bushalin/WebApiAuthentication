export class User{
    userId: string;
    userName : string;
    fullName: string;
    firstName : string;
    lastName: string;
    jobTitle: string;
    address: string;
    sex: string;
    phone: string;
    isLoggedIn: boolean = false;
    role: string[];
}

export class UserProfileEdit {
    UserId: string;
    FirstName: string;
    LastName: string;
    Sex: string;
    Phone: string;
    JobTitle: string;
    Address: string;
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
    IsEmployeeProfile: boolean = true; 
    IsActiveEmployee: boolean = true; 
}