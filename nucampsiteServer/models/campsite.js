/* Define a Mongoose Campsite Schema and Model */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose); // why are we requirind without assigning to a const?
const Currency = mongoose.Types.Currency;

/* ------ 3. Exercise: Mongoose ODM Parts 2 & 3 - Part 3: Add subdocuments to a document

    * instantiate a comment schema that will be used to create and validate comment documents     
    * each comment document will store a comments array and associated data for each campsite
    * instantiate a campsite schema that will be used to create and validate campsite documents 
    * each campsite document will store data for a campsite - including taking the 'commentSchema' as a subdocument
    * the property 'comment: [commentSchema]' allows every campsite document to contain multiple comment docs stored within an array
    * the first arg of a schema is required. it's an object that contains the schema definition 
    * the second arge is optional. it's used to set other config options
    
    const mySchema = new Schema( { required settings args object }, { optional args object} );

 ------ */

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    // generates timestamps for the moments the document is created (createdAt) and updated (updatedAt)
    timestamps: true 
});

// campsite schema that will be used to create documents to store campsite data
const campsiteSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    elevation: {
        type: Number,
        required: true
    },
    cost: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    },
    // 'commentSchema' is consumed as a subdocument of 'campsiteSchema'
    comments: [commentSchema] 
}, {
    timestamps: true // Ensure that each document created from this Schema will automatically be given CreatedAt and UpdatedAt fields
});

/* ------ 2. Exercise: Mongoose ODM Part 1 

    const campsiteSchema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true
        },
        comments: [commentSchema] 
    }, {
        timestamps: true
    });

------ */

/* ------ create a Campsite model using the campsiteSchema

    * the mongoose.model() method returns a constructor function 
    * the Model is used to instantiate documents
    * ES6 classes are syntactic sugar for the constructor function 
    
----- */
const Campsite = mongoose.model('Campsite', campsiteSchema);

module.exports = Campsite;