# Data Handling Guidelines for Duisburg Economic Dashboard

This document outlines the proper approaches for handling different data types in the Duisburg Economic Dashboard project.

## Data Directory Structure

```
duisburg-economic-dashboard/
├── src/
│   ├── data/
│   │   ├── raw/       (for original Excel/CSV files)
│   │   ├── processed/ (for cleaned/transformed data)
│   │   └── static/    (for JSON data ready to use in components)
```

## Handling Different Data Types

### Excel Files

Excel files should be:
1. Stored in `src/data/raw/`
2. Converted to JSON format using the provided scripts
3. The resulting JSON files should be stored in `src/data/static/`
4. Imported directly in React components

**Workflow:**

```bash
# Place your Excel file in src/data/raw/
# Then run the conversion script
npm run convert-data
# This will create JSON files in src/data/static/
```

**In your React components:**

```javascript
import economicData from '../data/static/economic_indicators.json';
// Or dynamically using the utility function
import { excelProcessing } from '../utils/dataProcessing';

// In your component:
const [data, setData] = useState(null);

useEffect(() => {
  const loadData = async () => {
    const economicData = await excelProcessing.importFromStatic('economic_indicators');
    setData(economicData);
  };
  
  loadData();
}, []);
```

### CSV Files

CSV files should be handled in one of two ways:

#### Approach 1: Pre-processing (Recommended for Static Data)

1. Store the CSV files in `src/data/raw/`
2. Convert them to JSON format using the provided scripts
3. Store the resulting JSON files in `src/data/static/`
4. Import them directly in your React components

**Workflow:**
```bash
# Place your CSV file in src/data/raw/
# Then run the conversion script
npm run convert-data
# This will create JSON files in src/data/static/
```

#### Approach 2: Runtime Processing (For User Uploads)

For CSV files that users might upload:

1. Install the PapaParse library: `npm install papaparse`
2. Use the provided `csvProcessing.parseAtRuntime()` utility function

**In your React components:**

```javascript
import { csvProcessing } from '../utils/dataProcessing';

// In your component:
const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const parsedData = await csvProcessing.parseAtRuntime(file);
    setData(parsedData);
  }
};

return (
  <div>
    <input type="file" accept=".csv" onChange={handleFileUpload} />
    {/* Render your data visualization here */}
  </div>
);
```

### Jupyter Notebooks

Jupyter notebooks are development artifacts and should not be included in the React repository. Instead:

1. Use notebooks for data exploration and analysis
2. Extract the final processed data from the notebooks
3. Save as JSON files in `src/data/static/`
4. Import these JSON files in your React components

**Best Practice:**
- Keep your Jupyter notebooks in a separate data processing repository
- Document the data transformation steps in the notebooks
- Only commit the final processed JSON data to the React repository

## Utility Functions

We provide utility functions in `src/utils/dataProcessing.js` to help with data handling:

- `excelProcessing.importFromStatic(filename)`: Import JSON data processed from Excel
- `csvProcessing.parseAtRuntime(csvFile)`: Parse CSV files at runtime
- `csvProcessing.importFromStatic(filename)`: Import JSON data processed from CSV

## Data Conversion Script

The `scripts/convert_data.js` script is provided to automate the conversion of raw data files to JSON format. To use it:

1. Install dependencies: `npm install xlsx csv-parser fs path`
2. Place your raw data files in `src/data/raw/`
3. Run: `npm run convert-data`
4. The processed JSON files will be saved to `src/data/static/`

## Economic Analysis Considerations

When handling economic data, keep in mind:

- **Temporal consistency**: Ensure time series data maintains consistent intervals and date formats
- **Missing values**: Handle missing values appropriately (interpolation, flagging, etc.)
- **Normalization**: Consider normalizing data when comparing across different scales
- **Seasonality**: Account for seasonal adjustments in economic indicators
- **Spatial aggregation**: Document the geographic level of aggregation for regional data

## Package Dependencies

The data handling approach requires these dependencies:

```
npm install xlsx csv-parser papaparse
```

Add these to your project as needed based on your data handling requirements.
