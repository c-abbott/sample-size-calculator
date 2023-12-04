import BinarySampleSizeCalculator from "./components/BinarySampleSizeCalculator";
import CalculatorContext from "./components/CalculatorContext";
import ContinuousSampleSizeCalculator from "./components/ContinuousSampleSizeCalculator";
import ExpandableContent from "./components/ExpandableContent";

function App() {
  return (
    <div className="bg-dark-900 min-h-screen text-primary p-4 md:p-8">
      <div className="px-4 sm:px-8 md:px-16 mx-auto">
        <CalculatorContext
          title="Binary Sample Size Calculator"
          text=" Use this calculator to determine the necessary sample size for running experiments concerned with assessing the difference in proportions. Examples: Conversion Rates, Retention, Click-Through Rates."
        />
        <BinarySampleSizeCalculator />
        {/* <ExpandableContent
            title="Learn More About the Binary Calculator Math"
            content="Detailed mathematical explanation for Binary Sample Size Calculator..."
          /> */}

        <div className="my-16">
          <CalculatorContext
            title="Continuous Sample Size Calculator"
            text=" Use this calculator to determine the necessary sample size for running experiments concerned with assessing the difference in means. Examples: Average Session Duration, Revenue per User, Customer Lifetime Value (CLV), Time to Conversion."
          />
          <ContinuousSampleSizeCalculator />
          {/* <ExpandableContent
            title="Learn More About the Continuous Calculator Math"
            content="Detailed mathematical explanation for Continuous Sample Size Calculator..."
          /> */}
        </div>
      </div>
    </div>
  );
}

export default App;
