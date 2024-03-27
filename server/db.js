import mongoose from 'mongoose';

const MY_DB_URL = 'mongodb://localhost:27017/portfolio'

mongoose.connect(
  MY_DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(`Sorry, something went wrong! ${err}`);
    } else {
      console.log(`Database connected @ MongoDB Cloud Swoop!`)
  }
 }
);

export default mongoose;