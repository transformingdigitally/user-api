import {AuthenticationBindings, AuthenticationComponent} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {addExtension, ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {PassportBasicAuthProvider} from './providers/my-basic-auth-strategy';
import {VerifyFunctionProvider} from './providers/verifyfn.provider';
import {UserRepository} from './repositories';
import {MySequence} from './sequence';


export {ApplicationConfig};

export class UserApiApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);


    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here

    this.component(AuthenticationComponent);
    this.bind('repositories.user').toClass(UserRepository);
    this.sequence(MySequence);
    this.bind('authentication.basic.verify').toProvider(VerifyFunctionProvider);

    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    addExtension(
      this,
      AuthenticationBindings.AUTHENTICATION_STRATEGY_EXTENSION_POINT_NAME,
      PassportBasicAuthProvider,
      {
        namespace:
          AuthenticationBindings.AUTHENTICATION_STRATEGY_EXTENSION_POINT_NAME,
      },
    )
  }
}
