import BinarySampleSizeCalculator from "./components/BinarySampleSizeCalculator";
import CalculatorContext from "./components/CalculatorContext";
import ContinuousSampleSizeCalculator from "./components/ContinuousSampleSizeCalculator";
import ExpandableContent from "./components/ExpandableContent";

function App() {
  return (
    <div className="bg-dark-900 min-h-screen text-primary p-8">
      <div className="px-16 mx-auto">
          <CalculatorContext
            title="Binary Sample Size Calculator"
            text="Use this calculator to determine the sample size for your binary data analysis."
          />
          <BinarySampleSizeCalculator />
          <ExpandableContent
            title="Learn More About the Binary Calculator Math"
            content="Detailed mathematical explanation for Binary Sample Size Calculator..."
          />

        <div className="my-16">
          <CalculatorContext
            title="Continuous Sample Size Calculator"
            text="Use this calculator to determine the sample size for continuous data."
          />
          <ContinuousSampleSizeCalculator />
          <ExpandableContent
            title="Learn More About the Continuous Calculator Math"
            content="Detailed mathematical explanation for Continuous Sample Size Calculator..."
          />
        </div>
      </div>
    </div>
  );
}

export default App;
