const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    required: true,
    match: [/^https?:\/\/.+/, 'Invalid URL format']
  },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email format']
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits']
  },
  address: {
    type: String,
    required: true
  },
  hiring: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
    default: new Date()
  }
});

const CompanyModel = mongoose.model('companies', CompanySchema);
module.exports = CompanyModel;
