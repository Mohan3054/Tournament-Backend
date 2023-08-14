const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date,
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Participant' }],
  status: String,
});

module.exports = mongoose.model('Tournament', tournamentSchema);