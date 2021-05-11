export class User {
  constructor(
    public accountNumber: string,
    public customerId: string,
    public username: string,
    public registrationDate: string,
    public personal: {
      name: string;
      password: string;
      email: string;
      gender: string;
      maritalStatus: string;
      contactNo: string;
      dob: string;
      citizenStatus: string;
    },
    public address: {
      addressLines: string;
      state: string;
      country: string;
      citizenship: string;
    },
    public guardian: { type: string; name: string },
    public bankDetails: {
      account: { type: string; branchName: string; depositAmount: number };
      idProof: { type: string; number: string };
      reference: {
        accountName: string;
        accountNumber: number;
        address: string;
      };
    }
  ) {}
}
