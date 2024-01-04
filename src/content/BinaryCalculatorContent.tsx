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
          "\\bar{X_{C}} \\sim \\text{Normal}({\\mu}_{\\bar{p}_{C}}, \\sigma_{\\bar{p}_{C}}^2)" +
          "\\\\" +
          "{\\mu}_{\\bar{p}_{C}} = p_{C}" +
          "\\\\[2.5mm]" +
          "\\sigma_{\\bar{p}_{C}}^2 = \\frac{p_{C}(1-p_{C})}{n_{C}}" +
          "\\\\[5mm]" +
          "\\text{Treatment Sample Distribution}" +
          "\\\\[2mm]" +
          "\\bar{X_{T}} \\sim \\text{Normal}({\\mu}_{\\bar{p}_{T}}, \\sigma_{\\bar{p}_{T}}^2)" +
          "\\\\" +
          "{\\mu}_{\\bar{p}_{T}} = p_{T}" +
          "\\\\[2.5mm]" +
          "\\sigma_{\\bar{p}_{T}}^2 = \\frac{p_{T}(1-p_{T})}{n_{T}}"}
      </BlockMath>
      Coming back to our example, the objective of the A/B test is to determine
      whether the new feature causes a statistically significant increase in
      conversion. To do this, we must first define our null hypothesis and
      alternative hypotheses:
      <BlockMath>{"H_{0}: p_{T} - p_{C} = 0"}</BlockMath>
      From this definition, we can then define the decision criteria to reject
      the null hypothesis and therefore declare a statistically significant
      difference in conversion rates between the treatment and control groups,
      namely:
      <BlockMath>
        {
          "\\text{Reject } H_{0} \\text{ if } p(\\bar{p}_{T} - \\bar{p}_{C} | H_{0}) < \\alpha"
        }
      </BlockMath>
      In other words, we must reject the null hypothesis if the probability of
      observing a difference in conversion rates between the treatment and
      control groups, assuming the null hypothesis to be true, is less than our
      significance level <InlineMath>{"\\alpha"}</InlineMath>. To obtain this
      probability we must first calculate the mean and variance of the sampling
      distribution of the difference in conversion rates between the treatment
      and control groups. Following the rules of expectation and variance for
      normally distributed independent random variables, we can calculate the
      mean and variance of the sampling distribution of the difference in
      conversion rates as follows:
      <BlockMath>
        {"{\\mu}_{\\bar{p}_{T} - \\bar{p}_{C}} = p_{T} - p_{C}" +
          "\\\\[2.5mm]" +
          "\\sigma_{\\bar{p}_{T} - \\bar{p}_{C}}^2 = \\frac{p_{T}(1-p_{T})}{n_{T}} + \\frac{p_{C}(1-p_{C})}{n_{C}}"}
      </BlockMath>
      Under the null hypothesis, we can assume that{" "}
      <InlineMath>{"p_{T} = p_{C}"}</InlineMath> and therefore the mean and
      variance of the sampling distribution of the difference in conversion
      rates simplifies to:
      <BlockMath>
        {"{\\mu}_{\\bar{p}_{T} - \\bar{p}_{C}} = 0" +
          "\\\\[2.5mm]" +
          "\\sigma_{\\bar{p}_{T} - \\bar{p}_{C}}^2 = \\frac{p_{T}(1-p_{T})}{n_{T}} + \\frac{p_{C}(1-p_{C})}{n_{C}} = \\frac{p_{T}(1-p_{T})}{n_{T}} + \\frac{p_{T}(1-p_{T})}{n_{C}} = p_{T}(1-p_{T})(\\frac{1}{n_{T}} + \\frac{1}{n_{C}})"}
      </BlockMath>
      If we now assume a baseline conversion rate of 0.50 (50%) for the control
      group and a minimum detectable effect of 0.05 (5%), we can calculate the
      sample size required to detect a statistically significant difference in
      conversion rates between the treatment and control groups. We can do this
      by first defining the minimum detectable effect as follows:
      <BlockMath>
        {"\\text{Minimum Detectable Effect} = \\Delta = p_{T} - p_{C} = 0.05"}
      </BlockMath>
      We can then substitute this into the variance of the sampling distribution
      of the difference in conversion rates to obtain: Finally, we can calculate
      the probability of observing a difference in conversion rates between the
      treatment and control groups, assuming the null hypothesis to be true, as
      follows:
      <BlockMath>
        {
          "p(\\bar{p}_{T} - \\bar{p}_{C} | H_{0}) = \\frac{\\bar{p}_{T} - \\bar{p}_{C}}{\\sqrt{\\frac{p_{T}(1-p_{T})}{n_{T}} + \\frac{p_{C}(1-p_{C})}{n_{C}}}}"
        }
      </BlockMath>
      We can now use this probability to define our decision criteria for
      rejecting the null hypothesis:
      <BlockMath>
        {
          "\\text{Reject } H_{0} \\text{ if } \\frac{\\bar{p}_{T} - \\bar{p}_{C}}{\\sqrt{\\frac{p_{T}(1-p_{T})}{n_{T}} + \\frac{p_{C}(1-p_{C})}{n_{C}}}} > z_{\\alpha/2}"
        }
      </BlockMath>
      Where <InlineMath>{"z_{\\alpha/2}"}</InlineMath> is the{" "}
      <InlineMath>{"\\alpha/2"}</InlineMath> quantile of the standard normal
      distribution. This is the same as saying:
      <br />
      <br />
      <BlockMath>
        {
          "Sample Size = \\frac{2 \\times (z_{\\alpha/2} + z_{\\beta})^2 \\times \\sigma^2}{\\Delta^2}"
        }
      </BlockMath>
    </p>
  </div>
);

export default BinaryCalculatorContent;
