const express = require('express');
const router = express.Router();
const Tournament = require('../models/Tournament');

// Create a new tournament
router.post('/create', async (req, res) => {
  try {
    const { name, startDate, endDate, status } = req.body;
    const newTournament = new Tournament({
      name,
      startDate,
      endDate,
      status,
    });
    await newTournament.save();
    res.status(201).json(newTournament);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all tournaments
router.get('/', async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.json(tournaments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single tournament by ID
router.get('/:id', getTournament, (req, res) => {
  res.json(res.tournament);
});

// Update a tournament by ID
router.patch('/:id', getTournament, async (req, res) => {
  if (req.body.name != null) {
    res.tournament.name = req.body.name;
  }
  if (req.body.startDate != null) {
    res.tournament.startDate = req.body.startDate;
  }
  if (req.body.endDate != null) {
    res.tournament.endDate = req.body.endDate;
  }
  if (req.body.status != null) {
    res.tournament.status = req.body.status;
  }
  try {
    const updatedTournament = await res.tournament.save();
    res.json(updatedTournament);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a tournament by ID
router.delete('/:id', getTournament, async (req, res) => {
  try {
    await res.tournament.remove();
    res.json({ message: 'Tournament deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get tournament by ID
async function getTournament(req, res, next) {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (tournament == null) {
      return res.status(404).json({ message: 'Tournament not found' });
    }
    res.tournament = tournament;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
