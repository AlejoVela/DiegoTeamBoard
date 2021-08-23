const moongose = require('mongoose');

const dbConnection = async () => {
  try {
    await moongose.connect(process.env.DB_CONNECTION, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connection with MONGODB is OK`);
  } catch (e) {
    console.log(`Failed to connect with server\nError: ${e}`);
    throw new Error(`Failed to connect with server\nError: ${e}`);
  }
};

module.exports = { dbConnection };