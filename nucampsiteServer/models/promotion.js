/* Define a Mongoose Promotion Schema and Model */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

/* ------ 3. Exercise: Mongoose ODM Parts 2 & 3 

  * instantiate a promotion schema that will be used to create and validate promotion documents     
  * each promotion document will store data for a promotion
  * the first arg of a schema is required. it's an object that contains the schema definition 
  * the second arge is optional. it's used to set other config options

const mySchema = new Schema( { required settings args object }, { optional args object} );

------ */
const promotionSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  featured: false,
  cost: {
    type: Currency, // Use the mongoose-currency library's Currency type for the cost field.
    required: true
  },
  description: {
      type: String,
      required: true
  }
}, {
  timestamps: true // Ensure that each document created from this Schema will automatically be given CreatedAt and UpdatedAt fields.
});

const Promotion = mongoose.model('Promotion', promotionSchema); // Create a Model named Promotion from this Schema. 

module.exports = Promotion; // Export the Promotion Model from this module.