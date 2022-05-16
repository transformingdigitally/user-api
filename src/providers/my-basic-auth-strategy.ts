import {AuthenticationStrategy} from '@loopback/authentication';
import {StrategyAdapter} from '@loopback/authentication-passport';
import {inject, Provider} from '@loopback/core';
import {BasicStrategy, BasicVerifyFunction} from 'passport-http';
import {myUserProfileFactory} from './my.userprofile.factory';
export const  AUTH_STRATEGY_NAME = 'basic'

export class PassportBasicAuthProvider<User>
  implements Provider<AuthenticationStrategy>
{
  constructor(
    @inject('authentication.basic.verify')
    private verifyFn: BasicVerifyFunction,
  ) {}

  value(): AuthenticationStrategy {
    const basicStrategy = this.configuredBasicStrategy(this.verifyFn);
    return this.convertToAuthStrategy(basicStrategy);
  }

  // Takes in the verify callback function and returns a configured basic strategy.
  configuredBasicStrategy(verifyFn: BasicVerifyFunction): BasicStrategy {
    return new BasicStrategy(verifyFn);
  }

  // Applies the `StrategyAdapter` to the configured basic strategy instance.
  // You'd better define your strategy name as a constant, like

  // You will need to decorate the APIs later with the same name
  // Pass in the user profile factory
  convertToAuthStrategy(basic: BasicStrategy): AuthenticationStrategy {
    return new StrategyAdapter(
      basic,
      AUTH_STRATEGY_NAME,
      myUserProfileFactory,
    );
  }
}
