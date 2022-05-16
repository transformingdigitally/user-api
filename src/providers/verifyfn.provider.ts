import {Provider} from '@loopback/core';
import {repository} from '@loopback/repository';
import {BasicVerifyFunction} from 'passport-http';
import {User} from '../models';
import {UserRepository} from '../repositories';

export class VerifyFunctionProvider
  implements Provider<BasicVerifyFunction>
{
  constructor(@repository('user') private userRepo: UserRepository) {}

  value(): BasicVerifyFunction {
    const myThis = this;

    return async function (
      username: string,
      password: string,
      cb: Function,
    ) {
      let user: User;

      try {
        //find user with specific email
        console.log("email",username);
        const users: User[] = await myThis.userRepo.find({
          where: {email: username},
        });

        // if no user found with this email, throw an error.
        if (users.length < 1) {
          let error = new Error("Invalid Username and Password"); //assign 401 in sequence
          throw error;
        }

        //verify given password matches the user's password
        user = users[0];
        if (user.password !== password) {
          let error = new Error("Invalid Username and Password"); //assign 401 in sequence
          throw error;
        }

        //return null for error, and the valid user
        cb(null, user);
      } catch (error) {
        //return the error, and null for the user
        cb(error, null);
      }
    };
  }
}
