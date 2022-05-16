import {UserProfileFactory} from '@loopback/authentication';
import {securityId, UserProfile} from '@loopback/security';
import {User} from '../models';

export const myUserProfileFactory: UserProfileFactory<User> = function (
  user: User,
): UserProfile {
  const userProfile = {[securityId]: user.email};
  return userProfile;
};
