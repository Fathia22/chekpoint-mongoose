const mongoose = require ('mongoose');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, 'config', '.env')});

// Connect to data base
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {familyName: 'ipv4'})
  .then(() => console.log('Connected To MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB', err.message));

  //create a person
  const personSchema = new mongoose.Schema({
    name: {type: String, required: true },
    age: Number,
    favoriteFoods: [String]
  });
  //Model
  const Person = mongoose.model('person', personSchema);

  //To create and save a record of a model
  const person = new Person({
    name: 'John',
    age: 35,
    favoriteFoods: ['pizza', 'pasta']
  });
  
  person.save()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });
  //create many contact
  const createPeople = async () => {
    const arrayOfPeople = [
      { name: 'Alice', age: 25, favoriteFoods: ['tacos', 'burgers'] },
      { name: 'Bob', age: 40, favoriteFoods: ['steak', 'pasta'] },
      { name: 'Charlie', age: 20, favoriteFoods: ['burritos', 'pizza'] }
    ];
    
    try {
      const data = await Person.create(arrayOfPeople);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  //To find all the people
  Person.find({ name: 'John'}, { maxTimeMS: 30000 } )
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
  //To find just one person which has a certain food in the person's favorites
  Person.findOne({ favoriteFoods: 'pizza' })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
 //To find the (only!!) person having a given _id
  const personId = "5ff070520635840cf47a455e";
  Person.findById(personId)
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
  //To perform classic updates by running find, 
  Person.findById(personId)
  .then((person) => {
    person.favoriteFoods.push('hamburger');
    return person.save();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
  //To perform new updates on a document 
  const personName = 'John';
Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
  //To delete one document
  Person.findByIdAndRemove(personId)
  .then((deletedPerson) => {
    console.log(deletedPerson);
  })
  .catch((err) => {
    console.error(err);
  });