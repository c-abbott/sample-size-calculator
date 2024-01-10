import React from "react";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";

const BinaryCalculatorContent: React.FC = () => (
  <div>
    <h2 className="text-left text-2xl font-semibold text-accent my-4">
      Hypothesis Testing of Two Proportions
    </h2>
    <p className="text-gray-300">
      Let's say we are working at a tech company and our team would like to run
      an A/B test on a new feature which they believe will increase conversion.
      Our team decides to run a 50/50 split test leaving us with two groups; the
      control population (who are not exposed to the new feature) and the
      treatment population (who are).
      <br />
      <br />
      Each unit of our population groups have a binary outcome, either they
      convert or they do not. This means the population distributions for the
      random variables <InlineMath>{"X_{C}"}</InlineMath> and{" "}
      <InlineMath>{"X_{T}"}</InlineMath> follow a Bernoulli distribution:
      <BlockMath>
        {"\\text{Control Population Distribution}" +
          "\\\\[2mm]" +
          "X_{C} \\sim \\text{Bernoulli}(\\mu_{C}, \\sigma_{C}^2)" +
          "\\\\" +
          "\\mu_{C} = p_{C}" +
          "\\\\" +
          "\\sigma_{C}^2 = p_{C}(1-p_{C})" +
          "\\\\[5mm]" +
          "\\text{Treatment Population Distribution}" +
          "\\\\[2mm]" +
          "X_{T} \\sim \\text{Bernoulli}(\\mu_{T}, \\sigma_{T}^2)" +
          "\\\\" +
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
      These Bernoulli distributions represent our population groups, however we
      don't have access to the entire population. Instead, must settle by
      collecting sample distributions of our population groups - this is what
      happens when the A/B test is run. For example, say we have 500 users in
      the treatment group and 500 users in the control group. Each time a user
      is exposed to our A/B test, a random independent sample is taken from the
      respective population distribution above. We therefore can apply the
      Central Limit Theorem to approximate our sample distributions as Normal
      with the following means and variances:
      <BlockMath>
        {"\\text{Control Sample Distribution}" +
          "\\\\[2mm]" +
          "\\bar{X}_{C} \\sim \\text{Normal}({\\mu}_{\\bar{p}_{C}}, \\sigma_{\\bar{p}_{C}}^2)" +
          "\\\\" +
          "{\\mu}_{\\bar{p}_{C}} = p_{C}" +
          "\\\\[2.5mm]" +
          "\\sigma_{\\bar{p}_{C}}^2 = \\frac{p_{C}(1-p_{C})}{n_{C}}" +
          "\\\\[5mm]" +
          "\\text{Treatment Sample Distribution}" +
          "\\\\[2mm]" +
          "\\bar{X}_{T} \\sim \\text{Normal}({\\mu}_{\\bar{p}_{T}}, \\sigma_{\\bar{p}_{T}}^2)" +
          "\\\\" +
          "{\\mu}_{\\bar{p}_{T}} = p_{T}" +
          "\\\\[2.5mm]" +
          "\\sigma_{\\bar{p}_{T}}^2 = \\frac{p_{T}(1-p_{T})}{n_{T}}"}
      </BlockMath>
      Coming back to our example, the objective of the A/B test is to determine
      whether the new feature causes a statistically significant increase in
      conversion. We are therefore interested in the uplift distribution which
      is defined as follows:
      <BlockMath>
        {"\\bar{X}_{\\Delta} = \\bar{X}_{T} - \\bar{X}_{C} \\sim \\text{Normal}({\\mu}_{\\Delta}, \\sigma_{\\Delta}^2)" +
          "\\\\[2.5mm]" +
          "{\\mu}_{\\Delta} = p_{T} - p_{C}" +
          "\\\\[2.5mm]" +
          "\\sigma_{\\Delta}^2 = \\frac{p_{T}(1-p_{T})}{n_{T}} + \\frac{p_{C}(1-p_{C})}{n_{C}}"}
      </BlockMath>
      We can simplify this equation based on our assumptions of a 50/50 split
      between treatment and control and assuming equal variances:
      <BlockMath>
        {"\\bar{X}_{\\Delta} = \\bar{X}_{T} - \\bar{X}_{C} \\sim \\text{Normal}({\\mu}_{\\Delta}, \\sigma_{\\Delta}^2)" +
          "\\\\[2.5mm]" +
          "{\\mu}_{\\Delta} = p - p = 0" +
          "\\\\[2.5mm]" +
          "\\sigma_{\\Delta}^2 = \\frac{2\\sigma^2}{N} = \\frac{2p(1-p)}{N}"}
      </BlockMath>
      Where our 50/50 split is represented by{" "}
      <InlineMath>{"n_{T} = n_{C} = N"}</InlineMath> and equal variances by{" "}
      <InlineMath>
        {"\\sigma_{\\bar{p}_{T}}^2 = \\sigma_{\\bar{p}_{C}}^2 = \\sigma^2"}
      </InlineMath>
      . With our uplift distribution defined, we can now begin deriving the
      sample size formula by reversing the p-value calculation of a one-sided
      test to determine the minimum sample size required to detect a
      statistically significant uplift. We begin this by defining our null and alternative
      hypotheses as follows:
      <BlockMath>
        {"H_{0}: \\mu_{\\Delta} = 0" +
          "\\\\[2.5mm]" +
          "H_{1}: \\mu_{\\Delta} > 0"}
      </BlockMath>

      Now the key idea
      <BlockMath>
        {"P(\\bar{X}_{\\Delta} \\geq \\bar{x}_{\\Delta} | H_{1}) \\leq P(\\bar{X}_{\\Delta} \\geq \\bar{x}_{\\text{crit}} | H_{1}) = 1-\\beta"}
      </BlockMath>

      blah, blah, blah, blah
    </p>
  </div>
);

export default BinaryCalculatorContent;
