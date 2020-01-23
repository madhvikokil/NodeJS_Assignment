import bcrypt from 'bcrypt';
import { User } from '../model/user';
import UserActivity from '../model/userActivity';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

exports.signup = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send('That user already exists!');
    } else {
      user = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin
      });
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
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('Incorrect email or password.');
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send('Incorrect email or password.');
  }

  const userActivity = new UserActivity({
    id: user._id,
    ipAddress: req.ip,
    uaString: req.headers['user-agent'],
    date: new Date().toLocaleDateString()
  });
  try {
    const saveActivity = await userActivity.save();
    // res.send(saveActivity)
    console.log('Stored data ', saveActivity);
  } catch (err) {
    // res.status(400).send(err)
  }

  const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.TOKEN);
  res.setHeader('authorization', token);
  res.send('Login Successfully');
};

exports.particularUser = (req, res) => {
  User.findOne({
    _id: req.params.id
  }, (error, books) => {
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
  (error, user) => {
    if (error) {
      res.send(error);
    } else {
      res.send(user);
    }
  });
};

exports.showUserCondition = (req, res) => {
  var token = req.headers.token;
  if (!token) return req.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, process.env.TOKEN, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    if (decoded.isAdmin === true) {
      User.find({}, (error, user) => {
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
