import React, { useState, useEffect } from 'react';
import { calculateSampleSize } from '../utils/calculations';

const ZTestSampleSizeCalculator: React.FC = () => {
  const [delta, setDelta] = useState<string>('0.2');
  const [avg, setAvg] = useState<string>('50');
  const [sd, setSd] = useState<string>('15');
  const [alpha, setAlpha] = useState<string>('0.05');
  const [beta, setBeta] = useState<string>('0.2');
  const [sampleSize, setSampleSize] = useState<number | null>(null);

  useEffect(() => {
    // Convert string values to numbers
    const numDelta = parseFloat(delta) || NaN;
    const numAvg = parseFloat(avg) || NaN;
    const numSd = parseFloat(sd) || NaN;
    const numAlpha = parseFloat(alpha) || NaN;
    const numBeta = parseFloat(beta) || NaN;

    // Check if all values are numbers before calling calculateSampleSize
    if (!isNaN(numDelta) && !isNaN(numAvg) && !isNaN(numSd) && !isNaN(numAlpha) && !isNaN(numBeta)) {
      const size = calculateSampleSize(numDelta, numAvg, numSd, numAlpha, numBeta);
      setSampleSize(size);
    } else {
      setSampleSize(null); // Reset sample size if any value is not a number
    }
  }, [delta, avg, sd, alpha, beta]); // Recalculate whenever these values change

  return (
      <div>
          <div>
            <label>
              Delta (Minimum Detectable Effect):
              <input
                type="text"
                className="form-control" // Bootstrap class for styling
                value={delta}
                onChange={e => setDelta(e.target.value)}
              />
            </label>
          </div>

      <div>
        <label>
          Average Value (avg):
          <input
            type="text"
            className="form-control"
            value={avg}
            onChange={e => setAvg(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Standard Deviation (sd):
          <input
            type="text"
            className="form-control"
            value={sd}
            onChange={e => setSd(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Significance Level (alpha):
          <input
            type="text"
            className="form-control"
            value={alpha}
            onChange={e => setAlpha(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Power (1 - beta):
          <input
            type="text"
            className="form-control"
            value={beta}
            onChange={e => setBeta(e.target.value)}
          />
        </label>
      </div>

      {sampleSize !== null && (
        <div className="mt-3">
          <strong>Calculated Sample Size:</strong> {sampleSize.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default ZTestSampleSizeCalculator;