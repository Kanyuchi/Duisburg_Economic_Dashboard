require('dotenv').config();
const fs = require('fs');
const net = require('net');
const path = require('path');

// Function to check if a port is in use
async function isPortInUse(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true); // Port is in use
      } else {
        resolve(false);
      }
    });
    
    server.once('listening', () => {
      // Close the server if it starts listening
      server.close();
      resolve(false); // Port is free
    });
    
    server.listen(port);
  });
}

// Function to update the port in .env file
function updateEnvFile(newPort) {
  const envPath = path.join(__dirname, '.env');
  
  try {
    let envContent = fs.readFileSync(envPath, 'utf8');
    // Replace the PORT line
    envContent = envContent.replace(/PORT=\d+/, `PORT=${newPort}`);
    fs.writeFileSync(envPath, envContent);
    console.log(`Updated .env file with new port: ${newPort}`);
    return true;
  } catch (err) {
    console.error('Error updating .env file:', err);
    return false;
  }
}

// Main function
async function checkAndChangePort() {
  const currentPort = process.env.PORT || 5000;
  console.log(`Current port in .env: ${currentPort}`);
  
  const portInUse = await isPortInUse(currentPort);
  
  if (portInUse) {
    console.log(`Port ${currentPort} is currently in use.`);
    
    // Find an available port
    for (let newPort = 3000; newPort < 9000; newPort++) {
      if (newPort === Number(currentPort)) continue;
      
      const isInUse = await isPortInUse(newPort);
      if (!isInUse) {
        console.log(`Found available port: ${newPort}`);
        if (updateEnvFile(newPort)) {
          console.log(`\nPORT CHANGED: Your server will now run on port ${newPort}`);
          console.log(`Update your API endpoints in your code to use: http://localhost:${newPort}/api/*`);
        }
        return;
      }
    }
    
    console.log('Could not find an available port between 3000 and 9000');
  } else {
    console.log(`Port ${currentPort} is available and ready to use.`);
  }
}

// Run the check
checkAndChangePort(); 