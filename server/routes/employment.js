const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

/**
 * @route   GET /api/employment
 * @desc    Get all employment statistics
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employment_stats ORDER BY year DESC, quarter DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching employment statistics:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/employment/:id
 * @desc    Get employment statistic by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM employment_stats WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employment statistic not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching employment statistic:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/employment/by-sector/:sector
 * @desc    Get employment statistics by sector
 * @access  Public
 */
router.get('/by-sector/:sector', async (req, res) => {
  try {
    const { sector } = req.params;
    const result = await pool.query('SELECT * FROM employment_stats WHERE sector = $1 ORDER BY year DESC, quarter DESC', [sector]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching employment statistics by sector:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/employment/by-year/:year
 * @desc    Get employment statistics by year
 * @access  Public
 */
router.get('/by-year/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const result = await pool.query('SELECT * FROM employment_stats WHERE year = $1 ORDER BY quarter', [year]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching employment statistics by year:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/employment
 * @desc    Create a new employment statistic
 * @access  Private (would typically require authentication)
 */
router.post('/', async (req, res) => {
  try {
    const { sector, employment_count, year, quarter } = req.body;
    
    const result = await pool.query(
      'INSERT INTO employment_stats (sector, employment_count, year, quarter) VALUES ($1, $2, $3, $4) RETURNING *',
      [sector, employment_count, year, quarter]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating employment statistic:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/employment/:id
 * @desc    Update an employment statistic
 * @access  Private (would typically require authentication)
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { sector, employment_count, year, quarter } = req.body;
    
    const result = await pool.query(
      'UPDATE employment_stats SET sector = $1, employment_count = $2, year = $3, quarter = $4 WHERE id = $5 RETURNING *',
      [sector, employment_count, year, quarter, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employment statistic not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating employment statistic:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/employment/:id
 * @desc    Delete an employment statistic
 * @access  Private (would typically require authentication)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM employment_stats WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employment statistic not found' });
    }
    
    res.json({ message: 'Employment statistic deleted successfully' });
  } catch (err) {
    console.error('Error deleting employment statistic:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 