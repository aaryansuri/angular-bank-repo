export class Loan {
  constructor(
    public type: string,
    public amount: number,
    public applyDate: string,
    public issueDate: string,
    public interest: number,
    public duration: number,
    public details: any
  ) {}
}
