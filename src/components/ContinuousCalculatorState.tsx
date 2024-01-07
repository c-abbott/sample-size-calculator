import React, { useState, useEffect } from "react";
import ContinuousSampleSizeCalculator from "./ContinuousSampleSizeCalculator";
import NormalDistributionChart from "./NormalDistributionChart";

const ContinuousCalculatorState: React.FC = () => {
  const [avg, setAvg] = useState<string>("7000");
  const [sd, setSd] = useState<string>("2500");
  const [mean, setMean] = useState<number>(0);
  const [variance, setVariance] = useState<number>(1);

  useEffect(() => {
    const numAvg = parseFloat(avg) || 0;
    const numSd = parseFloat(sd) || 1;
    setMean(numAvg);
    setVariance(Math.pow(numSd, 2));
  }, [avg, sd]);

  return (
    <div>
      <ContinuousSampleSizeCalculator
        avg={avg}
        setAvg={setAvg}
        sd={sd}
        setSd={setSd}
      />
      <NormalDistributionChart mean={mean} variance={variance} />
    </div>
  );
};

export default ContinuousCalculatorState;
