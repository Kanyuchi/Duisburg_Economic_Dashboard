const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

/**
 * @route   GET /api/indicators
 * @desc    Get all economic indicators
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM economic_indicators ORDER BY year DESC, quarter DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching economic indicators:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/indicators/:id
 * @desc    Get economic indicator by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM economic_indicators WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Economic indicator not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching economic indicator:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/indicators/by-year/:year
 * @desc    Get economic indicators by year
 * @access  Public
 */
router.get('/by-year/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const result = await pool.query('SELECT * FROM economic_indicators WHERE year = $1 ORDER BY quarter', [year]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching economic indicators by year:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/indicators
 * @desc    Create a new economic indicator
 * @access  Private (would typically require authentication)
 */
router.post('/', async (req, res) => {
  try {
    const { indicator_name, value, unit, year, quarter } = req.body;
    
    const result = await pool.query(
      'INSERT INTO economic_indicators (indicator_name, value, unit, year, quarter) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [indicator_name, value, unit, year, quarter]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating economic indicator:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/indicators/:id
 * @desc    Update an economic indicator
 * @access  Private (would typically require authentication)
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { indicator_name, value, unit, year, quarter } = req.body;
    
    const result = await pool.query(
      'UPDATE economic_indicators SET indicator_name = $1, value = $2, unit = $3, year = $4, quarter = $5 WHERE id = $6 RETURNING *',
      [indicator_name, value, unit, year, quarter, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Economic indicator not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating economic indicator:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/indicators/:id
 * @desc    Delete an economic indicator
 * @access  Private (would typically require authentication)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM economic_indicators WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Economic indicator not found' });
    }
    
    res.json({ message: 'Economic indicator deleted successfully' });
  } catch (err) {
    console.error('Error deleting economic indicator:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 