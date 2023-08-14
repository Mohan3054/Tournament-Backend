const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  name: String,
  // Other participant properties
});

module.exports = mongoose.model('Participant', participantSchema);