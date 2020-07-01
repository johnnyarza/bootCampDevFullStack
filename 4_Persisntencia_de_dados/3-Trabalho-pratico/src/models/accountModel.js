import mongoose from 'mongoose';

const accountSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  conta: {
    type: Number,
    required: true,
  },
  agencia: {
    type: Number,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) throw new Error('Balance menor que zero');
    },
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
});

const accountModel = mongoose.model('account', accountSchema);

export default accountModel;
