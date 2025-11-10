const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all assignments
router.get('/', (req, res) => {
  db.all('SELECT * FROM assignments', (err, assignments) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(assignments);
  });
});

// Get assignment by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM assignments WHERE id = ?', [id], (err, assignment) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  });
});

module.exports = router;

