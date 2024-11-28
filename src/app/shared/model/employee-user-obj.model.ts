export class EmployeeUserObj{
    Username :string;
    Password :string;
    FailPwdCount :number;
    IsLockedOut :boolean;
    IsActive :boolean;
    IsLoggedIn :boolean;
    LoggedInMethod :string;
    PasswordExpirationDt : Date; 
    IsNeedUpdatePassword :boolean;
    RefUserId : number;
    APIKey : string;
    RowVersion : string;
}