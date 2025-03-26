const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

/**
 * @route   GET /api/industrial
 * @desc    Get all industrial production data
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM industrial_production ORDER BY year DESC, quarter DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching industrial production data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/industrial/:id
 * @desc    Get industrial production data by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM industrial_production WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Industrial production data not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching industrial production data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/industrial/by-sector/:sector
 * @desc    Get industrial production data by sector
 * @access  Public
 */
router.get('/by-sector/:sector', async (req, res) => {
  try {
    const { sector } = req.params;
    const result = await pool.query(
      'SELECT * FROM industrial_production WHERE industry_sector = $1 ORDER BY year DESC, quarter DESC', 
      [sector]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching industrial production data by sector:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/industrial/by-year/:year
 * @desc    Get industrial production data by year
 * @access  Public
 */
router.get('/by-year/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const result = await pool.query('SELECT * FROM industrial_production WHERE year = $1 ORDER BY quarter', [year]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching industrial production data by year:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/industrial
 * @desc    Create new industrial production data
 * @access  Private (would typically require authentication)
 */
router.post('/', async (req, res) => {
  try {
    const { industry_sector, production_value, year, quarter } = req.body;
    
    const result = await pool.query(
      'INSERT INTO industrial_production (industry_sector, production_value, year, quarter) VALUES ($1, $2, $3, $4) RETURNING *',
      [industry_sector, production_value, year, quarter]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating industrial production data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/industrial/:id
 * @desc    Update industrial production data
 * @access  Private (would typically require authentication)
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { industry_sector, production_value, year, quarter } = req.body;
    
    const result = await pool.query(
      'UPDATE industrial_production SET industry_sector = $1, production_value = $2, year = $3, quarter = $4 WHERE id = $5 RETURNING *',
      [industry_sector, production_value, year, quarter, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Industrial production data not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating industrial production data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/industrial/:id
 * @desc    Delete industrial production data
 * @access  Private (would typically require authentication)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM industrial_production WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Industrial production data not found' });
    }
    
    res.json({ message: 'Industrial production data deleted successfully' });
  } catch (err) {
    console.error('Error deleting industrial production data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 