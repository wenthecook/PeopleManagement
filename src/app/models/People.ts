export class People {
  private _FirstName: string;
  public get FirstName() {
    return this._FirstName;
  }

  private _LastName: string;
  public get LastName() {
    return this._LastName;
  }

  private _DateOfBirth: Date;
  public get DateOfBirth() {
    return this._DateOfBirth;
  }

  private _TelephoneNumber: string;
  public get TelephoneNumber() {
    return this._TelephoneNumber;
  }

  private _Email: string;
  public get Email() {
    return this._Email;
  }

  constructor(
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    telephoneNumber: string,
    email: string
    ) {
    this._FirstName = firstName;
    this._LastName = lastName;
    this._DateOfBirth = dateOfBirth;
    this._TelephoneNumber = telephoneNumber;
    this._Email = email;
  }
}
