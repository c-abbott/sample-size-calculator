import React, { useState, useEffect } from "react";
import ContinuousSampleSizeCalculator from "./ContinuousSampleSizeCalculator";
import NormalDistributionChart from "./NormalDistributionChart";

const ContinuousCalculatorState: React.FC = () => {
  const [avg, setAvg] = useState<string>("7000");
  const [sd, setSd] = useState<string>("2500");
  const [mean, setMean] = useState<number>(0);
  const [variance, setVariance] = useState<number>(1);
  const [delta, setDelta] = useState<string>("5");
  const [alternativeMean, setAlternativeMean] = useState<number>(0);

  useEffect(() => {
    const numAvg = parseFloat(avg) || 0;
    const numSd = parseFloat(sd) || 1;
    const newMean = numAvg;
    const newVariance = Math.pow(numSd, 2);
    const numDelta = parseFloat(delta) || 0;
    const newAlternativeMean = newMean * (1 + numDelta / 100);

    setMean(newMean);
    setVariance(newVariance);
    setAlternativeMean(newAlternativeMean);
  }, [avg, sd, delta]);

  return (
    <div>
      <ContinuousSampleSizeCalculator
        avg={avg}
        setAvg={setAvg}
        sd={sd}
        setSd={setSd}
        delta={delta}
        setDelta={setDelta}
      />
      <NormalDistributionChart mean={mean} variance={variance} alternativeMean={alternativeMean} />
    </div>
  );
};

export default ContinuousCalculatorState;
