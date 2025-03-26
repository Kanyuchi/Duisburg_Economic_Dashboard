-- Create tables for Duisburg Economic Dashboard

-- Table for Economic Indicators
CREATE TABLE IF NOT EXISTS economic_indicators (
    id SERIAL PRIMARY KEY,
    indicator_name VARCHAR(100) NOT NULL,
    value DECIMAL(15,2),
    unit VARCHAR(50),
    year INTEGER,
    quarter INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Employment Statistics
CREATE TABLE IF NOT EXISTS employment_stats (
    id SERIAL PRIMARY KEY,
    sector VARCHAR(100),
    employment_count INTEGER,
    year INTEGER,
    quarter INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Industrial Production
CREATE TABLE IF NOT EXISTS industrial_production (
    id SERIAL PRIMARY KEY,
    industry_sector VARCHAR(100),
    production_value DECIMAL(15,2),
    year INTEGER,
    quarter INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Trade Statistics
CREATE TABLE IF NOT EXISTS trade_stats (
    id SERIAL PRIMARY KEY,
    trade_type VARCHAR(50),
    value DECIMAL(15,2),
    year INTEGER,
    quarter INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better query performance
CREATE INDEX idx_economic_indicators_year ON economic_indicators(year);
CREATE INDEX idx_employment_stats_year ON employment_stats(year);
CREATE INDEX idx_industrial_production_year ON industrial_production(year);
CREATE INDEX idx_trade_stats_year ON trade_stats(year);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_economic_indicators_updated_at
    BEFORE UPDATE ON economic_indicators
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employment_stats_updated_at
    BEFORE UPDATE ON employment_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_industrial_production_updated_at
    BEFORE UPDATE ON industrial_production
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trade_stats_updated_at
    BEFORE UPDATE ON trade_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 