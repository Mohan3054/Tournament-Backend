const express = require('express');
const router = express.Router();
const Participant = require('../models/Participant');

// Create a new participant
router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;
    const newParticipant = new Participant({ name });
    await newParticipant.save();
    res.status(201).json(newParticipant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all participants
router.get('/', async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single participant by ID
router.get('/:id', getParticipant, (req, res) => {
  res.json(res.participant);
});

// Update a participant by ID
router.patch('/:id', getParticipant, async (req, res) => {
  if (req.body.name != null) {
    res.participant.name = req.body.name;
  }
  try {
    const updatedParticipant = await res.participant.save();
    res.json(updatedParticipant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a participant by ID
router.delete('/:id', getParticipant, async (req, res) => {
  try {
    await res.participant.remove();
    res.json({ message: 'Participant deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware to get participant by ID
async function getParticipant(req, res, next) {
  try {
    const participant = await Participant.findById(req.params.id);
    if (participant == null) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    res.participant = participant;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
