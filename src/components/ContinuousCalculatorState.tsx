import React, { useState, useEffect } from "react";
import ContinuousSampleSizeCalculator from "./ContinuousSampleSizeCalculator";
import NormalDistributionChart from "./NormalDistributionChart";
import ExpandableContent from "./ExpandableContent";
import BinaryCalculatorContent from "../content/BinaryCalculatorContent";

const ContinuousCalculatorState: React.FC = () => {
  const [avg, setAvg] = useState<string>("7000");
  const [sd, setSd] = useState<string>("2500");
  const [mean, setMean] = useState<number>(0);
  const [variance, setVariance] = useState<number>(1);
  const [delta, setDelta] = useState<string>("5");
  const [alternativeMean, setAlternativeMean] = useState<number>(0);
  const [alpha, setAlpha] = useState<string>("5");
  const [beta, setBeta] = useState<string>("20");

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
        alpha={alpha}
        setAlpha={setAlpha}
        beta={beta}
        setBeta={setBeta}
      />
      <ExpandableContent title="How does this work?">
        <BinaryCalculatorContent />
      </ExpandableContent>
      <NormalDistributionChart
        mean={mean}
        variance={variance}
        alternativeMean={alternativeMean}
        alpha={parseFloat(alpha) / 100}
        beta={parseFloat(beta) / 100}
      />
    </div>
  );
};

export default ContinuousCalculatorState;
