import User from '../models/user-model.js';
import Success from '../models/success-model.js';
import saltedPasswords from '../saltedPasswords.js';
import decodePassword from '../../frondend/src/services/decodePassword.js';


// Function to get a random salted password
export const getSaltedPassword = async (req, res) => {
  try {
    const randomSaltedPassword = saltedPasswords[Math.floor(Math.random() * saltedPasswords.length)];
    res.json({ saltedPassword: randomSaltedPassword });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching salted password' });
  }
};

// Function to verify a user's password
export const verifyPassword = async (req, res) => {
  const { email, crackedPassword, saltedPassword } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Decode the current salted password
    const decodedPassword = decodePassword(saltedPassword.trim());
    console.log(decodedPassword);
    console.log(crackedPassword);
    // Compare the decoded password with the user input
    if (decodedPassword === crackedPassword.trim()) {
      // Save success data in the success log
      console.log("correct password");
      const success = new Success({
        email,
        saltedPassword,
        message: 'Successfully cracked the password!'
      });
      await success.save();

      return res.json({ message: 'Successfully cracked the password!' });
    } else {
      console.log("wrong password");
      return res.status(400).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error verifying password:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// New function to get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users
    res.json(users); // Return the list of users
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Error fetching users' });
  }
};