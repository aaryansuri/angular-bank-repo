import * as moment from 'moment';
import { User } from '../model/user.model';

export class CreateUser {
  public static createNew(form: any) {
    console.log(form);

    var random = Math.floor(Math.random() * 1000);
    const customerId =
      'R' + (random < 10 ? '00' : random < 100 ? '0' : '') + +random;

    const accountNumber = this.generateAccountNumber(16);
    const dob = form.personal.dob;
    const age = moment().diff(dob, 'years');
    const formattedDob = moment(dob).format('dd/MM/yyyy').toString();
    const registrationDate = moment().format('dd/MM/yyyy').toString();

    if (age < 18) {
      var citizenStatus = 'Minor';
    } else if (age > 18 && age <= 60) {
      citizenStatus = 'Normal';
    } else {
      citizenStatus = 'Senior';
    }

    var personal = form.personal;
    var guardian = form.guardian;
    var address = form.address;
    var bankDetails = form.bankDetails;

    var user: User = new User(
      accountNumber,
      customerId,
      form.username,
      registrationDate,
      {
        name: personal.name,
        password: personal.password,
        email: personal.email,
        gender: personal.gender,
        maritalStatus: personal.maritalStatus,
        contactNo: personal.contactNo,
        dob: formattedDob,
        citizenStatus,
      },
      {
        addressLines: address.addressLines,
        state: address.state,
        country: address.country,
        citizenship: address.citizenship,
      },
      { type: guardian.type, name: guardian.name },
      {
        account: {
          type: bankDetails.account.type,
          branchName: bankDetails.account.branchName,
          depositAmount: bankDetails.account.depositAmount,
        },
        idProof: {
          type: bankDetails.idProof.type,
          number: bankDetails.idProof.number,
        },
        reference: {
          accountName: bankDetails.reference.accountName,
          accountNumber: bankDetails.reference.accountNumber,
          address: bankDetails.reference.address,
        },
      }
    );

    return user;
  }

  static generateAccountNumber(digit: number) {
    return Math.random().toFixed(digit).split('.')[1];
  }
}
