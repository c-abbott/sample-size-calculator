import BinaryCalculatorContent from "./content/BinaryCalculatorContent";
import BinarySampleSizeCalculator from "./components/BinarySampleSizeCalculator";
import CalculatorContext from "./components/CalculatorContext";
import ContinuousSampleSizeCalculator from "./components/ContinuousSampleSizeCalculator";
import ExpandableContent from "./components/ExpandableContent";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="bg-dark-900 min-h-screen text-primary p-4 md:p-8">
      <Helmet>
        <title>Sample Size Calculator</title>
        <meta property="og:title" content="Sample Size Calculator" />
        <meta
          property="og:description"
          content="A simple and effective tool for calculating the sample size needed for your next a/b test."
        />
        <meta property="og:image" content="https://ibb.co/tX8kX42" />
        <meta
          property="og:url"
          content="https://sample-size-calculator.vercel.app/"
        />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="px-4 sm:px-8 md:px-16 mx-auto">
        <CalculatorContext
          title="Binary Sample Size Calculator"
          text=" Use this calculator to determine the necessary sample size for running experiments concerned with assessing the difference in proportions. Examples: Conversion Rates, Retention, Click-Through Rates."
        />
        <BinarySampleSizeCalculator />
        <ExpandableContent title="How does this work?">
          <BinaryCalculatorContent />
        </ExpandableContent>
        <div className="my-16">
          <CalculatorContext
            title="Continuous Sample Size Calculator"
            text=" Use this calculator to determine the necessary sample size for running experiments concerned with assessing the difference in means. Examples: Average Session Duration, Revenue per User, Customer Lifetime Value (CLV), Time to Conversion."
          />
          <ContinuousSampleSizeCalculator />
          <ExpandableContent title="How does this work?">
            <BinaryCalculatorContent />
          </ExpandableContent>
        </div>
      </div>
    </div>
  );
}

export default App;
