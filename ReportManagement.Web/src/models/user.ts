import { stringify } from 'querystring';

export class User{
    userId: string;
    userName : string;
    fullName: string;
    firstName : string;
    lastName: string;
    jobTitle: string;
    address: string;
    address_PostCode: string;
    sex: string;
    phone: string;
    // DETERMINING THE LOGGED IN PROPERTIES
    isLoggedIn: boolean = false;
    // FIRST_TIME_LOGIN Attirbute
    firstTimeLogIn: boolean = true;
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
    Address_PostCode: string;
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

export class ChangePassword {
    OldPassword: string;
    NewPassword: string;
    ConfirmPassword: string;
}

export class AssignUserToRolesModel {
    UserId: string;
    RolesToAssign: string[] = [];
}