import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

const BinaryCalculatorContent: React.FC = () => (
  <div>
    <h2 className="text-left text-2xl font-semibold text-accent my-4">
      Hypothesis Testing of Two Proportions
    </h2>
    <p>
      Let's say we are working at a tech company and our team would like to run
      an A/B test on a new feature which they believe will increase conversion.
      Our team decides to run a 50/50 split test leaving us with two groups; the
      control population (who are not exposed to the new feature) and the
      treatment population (who are).
      <br />
      <br />
      Each unit of our population groups have a binary outcome, either they
      convert or they do not. This means the population distributions for this
      scenario follow a Bernoulli distribution:
      <BlockMath>
        {"\\text{Control Population Distribution}" +
          "\\\\" +
          "\\mu_{C} = p_{C}" +
          "\\\\" +
          "\\sigma_{C}^2 = p_{C}(1-p_{C})" +
          "\\\\[5mm]" +
          "\\text{Treatment Population Distribution}" +
          "\\\\" +
          "\\mu_{T} = p_{T}" +
          "\\\\" +
          "\\sigma_{T}^2 = p_{T}(1-p_{T})"}
      </BlockMath>
      Where <InlineMath>{"p_{C}"}</InlineMath> and{" "}
      <InlineMath>{"p_{T}"}</InlineMath> are the conversion rates,{" "}
      <InlineMath>{"\\mu_{C}"}</InlineMath> and{" "}
      <InlineMath>{"\\mu_{T}"}</InlineMath> are the population means, and{" "}
      <InlineMath>{"\\sigma_{C}^2"}</InlineMath> and{" "}
      <InlineMath>{"\\sigma_{T}^2"}</InlineMath> are the population variances
      for the control and treatment groups respectively.
      <br />
      <br />
      To truly appreciate this calculator, we must first grasp that we are
      dealing with two populations; the control group and the treatment group.
      For this example, let's say our A/B test is to determine whether a new
      feature The calculator uses a two-sided Z-test to compute the sample size.
      A Z-score tells us how far from the mean a data point is, in terms of
      standard deviations.
    </p>

    <p>The Formula:</p>
    <BlockMath>
      {
        "Sample Size = \\frac{2 \\times (z_{\\alpha/2} + z_{\\beta})^2 \\times \\sigma^2}{\\Delta^2}"
      }
    </BlockMath>
  </div>
);

export default BinaryCalculatorContent;
