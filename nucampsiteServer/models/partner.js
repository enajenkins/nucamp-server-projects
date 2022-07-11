/* Define a Mongoose Partner Schema and Model */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

/* ------ 3. Exercise: Mongoose ODM Parts 2 & 3  

  * instantiate a partner schema that will be used to create and validate partner documents     
  * each partner document will store data for a partner
  * the first arg of a schema is required. it's an object that contains the schema definition 
  * the second arge is optional. it's used to set other config options

const mySchema = new Schema( { required settings args object }, { optional args object} );

------ */
const partnerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  image: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  description: {
      type: String,
      required: true
  }
}, {
  // generates timestamps for the moments the document is created (createdAt) and updated (updatedAt)
  timestamps: true 
});

const Partner = mongoose.model('Partner', partnerSchema); // Create a Model named Partner from this Schema. 

module.exports = Partner; // Export the Partner Model from this module.