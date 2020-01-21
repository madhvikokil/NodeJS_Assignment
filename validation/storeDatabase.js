import UserActivity from '../model/userActivity';
import { User } from '../model/user';

exports.userActivity = (id, ipAddress, uaString, date) => new UserActivity({
  id: id,
  ipAddress: ipAddress,
  uaString: uaString,
  date: date
});

exports.signupActivity = (req) => new User({
  name: req.name,
  lastname: req.lastname,
  email: req.email,
  password: req.password,
  isAdmin: req.isAdmin
});
