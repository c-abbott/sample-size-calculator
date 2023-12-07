import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const BinaryCalculatorContent: React.FC = () => (
  <div>
    <p>When you're planning an A/B test, one of the crucial steps is determining the right sample size. Our Binary Sample Size Calculator helps you figure out how many participants you need to reliably detect a difference in proportions.</p>

    <h2>🧮 The Math Behind It</h2>
    <p>The calculator uses a two-sided Z-test to compute the sample size. A Z-score tells us how far from the mean a data point is, in terms of standard deviations.</p>
    
    <p>The Formula:</p>
    <BlockMath>{'Sample Size = \\frac{2 \\times (Z_{\\alpha/2} + Z_{\\beta})^2 \\times \\delta^2}{MDE^2}'}</BlockMath>
  
  </div>
);

export default BinaryCalculatorContent;
