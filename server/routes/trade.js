const express = require('express');
const router = express.Router();
const { pool } = require('../config/db');

/**
 * @route   GET /api/trade
 * @desc    Get all trade statistics
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM trade_stats ORDER BY year DESC, quarter DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching trade statistics:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/trade/:id
 * @desc    Get trade statistic by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM trade_stats WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Trade statistic not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching trade statistic:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/trade/by-type/:type
 * @desc    Get trade statistics by type (import/export)
 * @access  Public
 */
router.get('/by-type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const result = await pool.query(
      'SELECT * FROM trade_stats WHERE trade_type = $1 ORDER BY year DESC, quarter DESC', 
      [type]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching trade statistics by type:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/trade/by-year/:year
 * @desc    Get trade statistics by year
 * @access  Public
 */
router.get('/by-year/:year', async (req, res) => {
  try {
    const { year } = req.params;
    const result = await pool.query('SELECT * FROM trade_stats WHERE year = $1 ORDER BY quarter', [year]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching trade statistics by year:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/trade/summary
 * @desc    Get trade balance summary (exports - imports) by year
 * @access  Public
 */
router.get('/summary', async (req, res) => {
  try {
    const query = `
      SELECT 
        t1.year, 
        t1.quarter, 
        COALESCE(t1.value, 0) as exports, 
        COALESCE(t2.value, 0) as imports,
        COALESCE(t1.value, 0) - COALESCE(t2.value, 0) as balance
      FROM 
        (SELECT year, quarter, value FROM trade_stats WHERE trade_type = 'Export') as t1
      FULL OUTER JOIN 
        (SELECT year, quarter, value FROM trade_stats WHERE trade_type = 'Import') as t2
      ON 
        t1.year = t2.year AND t1.quarter = t2.quarter
      ORDER BY 
        t1.year DESC, t1.quarter DESC
    `;
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching trade balance summary:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/trade
 * @desc    Create a new trade statistic
 * @access  Private (would typically require authentication)
 */
router.post('/', async (req, res) => {
  try {
    const { trade_type, value, year, quarter } = req.body;
    
    const result = await pool.query(
      'INSERT INTO trade_stats (trade_type, value, year, quarter) VALUES ($1, $2, $3, $4) RETURNING *',
      [trade_type, value, year, quarter]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating trade statistic:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/trade/:id
 * @desc    Update a trade statistic
 * @access  Private (would typically require authentication)
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { trade_type, value, year, quarter } = req.body;
    
    const result = await pool.query(
      'UPDATE trade_stats SET trade_type = $1, value = $2, year = $3, quarter = $4 WHERE id = $5 RETURNING *',
      [trade_type, value, year, quarter, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Trade statistic not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating trade statistic:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/trade/:id
 * @desc    Delete a trade statistic
 * @access  Private (would typically require authentication)
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM trade_stats WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Trade statistic not found' });
    }
    
    res.json({ message: 'Trade statistic deleted successfully' });
  } catch (err) {
    console.error('Error deleting trade statistic:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 