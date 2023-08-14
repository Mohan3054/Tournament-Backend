const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const tournamentRoutes = require('./routes/tournamentRoutes');
const participantRoutes = require('./routes/participantRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://Mohan:Mohan45@cluster0.7dn1seb.mongodb.net/tournament_system', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use CORS middleware
app.use(cors('http://localhost:3000/api/tournaments'));

// More middleware setup, body parsing, etc.

app.use('/api/tournaments', tournamentRoutes);
app.use('/api/participants', participantRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
