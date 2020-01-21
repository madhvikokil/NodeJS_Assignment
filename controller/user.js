import bcrypt from 'bcrypt';
import { User } from '../model/user';
import UserActivity from '../model/userActivity';
import { validateRegister, validateLogin } from '../validation/validation';
import Dashboard from '../validation/storeDatabase';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

exports.signup = async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send('That user already exists!');
    } else {
      user = Dashboard.signupActivity(req.body);
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      user.save();
      res.send('Signed up Successfully').status(200);
    }
  } catch (error) {
    return res.send('error...');
  }
};

exports.login = async (req, res) => {
  const { error } = validateLogin(req.body);
  try {
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send('Incorrect email or password..');
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(400).send('Incorrect email or password.');
    }
    const userActivity = Dashboard.userActivity(user._id, req.ip, req.headers['user-agent'], new Date().toLocaleDateString());
    await userActivity.save();
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN);
    res.send(token);
  } catch (error) {
    res.status(400).send('error');
  }
};

exports.particularUser = (req, res) => {
  User.findOne({
    _id: req.params.id
  }, function (error, books) {
    if (error) {
      res.send('error has occured...q');
    } else {
      res.send(books);
    }
  });
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate({
    _id: req.params.id
  },
  {
    $set:
        {
          name: req.body.name,
          lastname: req.body.lastname
        }
  },
  { new: true },
  function (error, user) {
    if (error) {
      res.send(error);
    } else {
      res.send(user);
    }
  });
};

exports.showUserCondition = function (req, res) {
  var token = req.headers.token;
  if (!token) return req.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.TOKEN, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    if (decoded.isAdmin === true) {
      User.find({}, function (error, user) {
        if (error) {
          res.send('error has occured....');
        } else {
          res.send(user);
        }
      });
    } else {
      res.send('Not an Admin User');
    }
  });
};

exports.lastActive = async (req, res) => {
  const newDate = new Date();
  const dt = newDate.setDate(newDate.getDate() - process.env.NOT_LOGGED_IN);
  try {
    const response = await UserActivity.find({ date: { $lt: dt } }).populate('userData').exec();
    res.status(200).send(response);
  } catch (error) {
    res.statue(400).send('Incorrect');
  }
};
