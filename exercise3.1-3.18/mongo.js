import mongoose from "mongoose";
const name = process.argv[2];
const phone = process.argv[3];
const url = `mongodb://127.0.0.1:27017/phonebook-app?retryWrites=true`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const phoneSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Phone = mongoose.model("Phonebook", phoneSchema);
if (name) {
  const phonebook = new Phone({
    name: name,
    phone: phone,
  });

  phonebook.save().then((result) => {
    console.log(`added ${name},number ${phone} to phonebook`);
    mongoose.connection.close();
  });
}
if (!name) {
  console.log("phonebook");
  Phone.find({}).then((result) => {
    result.forEach((obj) => {
      console.log(`${obj.name} ${obj.phone}`);
    });
    mongoose.connection.close();
  });
}
