import { pool } from '../config/config.js';

// Fetch all users
const getUsersDb = async () => {
  let [data] = await pool.query('SELECT * FROM Users');
  return data;
};

// Select user by email address
const selectUsersDb = async (emailAdd) => {
  let [[data]] = await pool.query('SELECT * FROM Users WHERE emailAdd = ?', [emailAdd]);
  return data ? data : '';
};

// Select user by ID
const selectUserDb = async (UserID) => {
  let [[data]] = await pool.query('SELECT * FROM Users WHERE UserID = ?', [UserID]);
  return data;
};

// Insert new user
const insertUserDb = async (firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile) => {
  let [data] = await pool.query(
    `INSERT INTO Users (firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile]
  );
  return data;
};

// Delete user by ID
// const deleteUserDb = async (UserID) => {
//   await pool.query('DELETE FROM Users WHERE UserID = ?', [UserID]);}

const deleteUserDb = async (UserID) => {
  try {
    // Check if the user exists before deleting
    const user = await selectUserDb(UserID);
    if (!user) {
      console.error(`User with ID ${UserID} not found.`);
      return { message: `User with ID ${UserID} not found.` };
    }

    // Proceed with deleting the user
    await pool.query(`DELETE FROM Users WHERE UserID = ${UserID}`);
    console.log(`User with ID ${UserID} deleted successfully`);
    return { message: `User with ID ${UserID} deleted successfully` };
  } catch (error) {
    console.error(`Error deleting user: ${error}`);
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

// Update user by ID
const updateUserDb = async (firstName, lastName, userAge, Gender, emailAdd, userProfile, UserID) => {
  try {
    // Check if the user exists before updating
    const user = await selectUserDb(UserID);
    if (!user) {
      console.error(`User with ID ${UserID} not found.`);
      return { message: `User with ID ${UserID} not found.` };
    }

    // Proceed with updating the user
    await pool.query(
      'UPDATE Users SET firstName = ?, lastName = ?, userAge = ?, Gender = ?, emailAdd = ?, userProfile = ? WHERE UserID = ?',
      [firstName, lastName, userAge, Gender, emailAdd, userProfile, UserID]
    );
    console.log(`User with ID ${UserID} updated successfully`);
    return { message: `User with ID ${UserID} updated successfully` };
  } catch (error) {
    console.error(`Error updating user: ${error}`);
    throw new Error(`Error updating user: ${error.message}`);
  }
};

export { getUsersDb, selectUsersDb, insertUserDb, deleteUserDb, updateUserDb, selectUserDb };
