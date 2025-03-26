@echo off
echo === Duisburg Economic Dashboard Server Setup ===
echo.
echo 1. Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo Error installing dependencies
    pause
    exit /b 1
)
echo Dependencies installed successfully!
echo.

echo 2. Initializing database...
call node db/init-db.js
if %ERRORLEVEL% NEQ 0 (
    echo Error initializing database
    pause
    exit /b 1
)
echo Database initialized successfully!
echo.

echo 3. Importing data...
call node db/import-data.js
if %ERRORLEVEL% NEQ 0 (
    echo Error importing data
    pause
    exit /b 1
)
echo Data imported successfully!
echo.

echo 4. Starting server...
echo Server is running on http://localhost:5000
echo Available API endpoints:
echo - http://localhost:5000/api/indicators
echo - http://localhost:5000/api/employment
echo - http://localhost:5000/api/industrial
echo - http://localhost:5000/api/trade
echo - http://localhost:5000/api/trade/summary
echo.
echo Press Ctrl+C to stop the server
call npm start 