import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const BinaryCalculatorContent: React.FC = () => (
  <div>
    <p>When you're planning an A/B test, one of the crucial steps is determining the right sample size. Our Binary Sample Size Calculator helps you figure out how many participants you need to reliably detect a difference in proportions. We really trying to keep them green.</p>

    <h1>🧮 The Math Behind It</h1>
    <p>The calculator uses a two-sided Z-test to compute the sample size. A Z-score tells us how far from the mean a data point is, in terms of standard deviations. Just trying to keep my github squares green at this point. Really getting desperate at this point. Blah, blah, blah, blah, blah, blah, blah</p>
    
    <p>The Formula:</p>
    <BlockMath>{'Sample Size = \\frac{2 \\times (Z_{\\alpha/2} + Z_{\\beta})^2 \\times \\delta^2}{MDE}'}</BlockMath>
  
  </div>
);

export default BinaryCalculatorContent;
