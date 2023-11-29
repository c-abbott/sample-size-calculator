import BinarySampleSizeCalculator from "./components/BinarySampleSizeCalculator";
import ContinuousSampleSizeCalculator from "./components/ContinuousSampleSizeCalculator";

function App() {
  return (
    <div className="bg-dark-900 min-h-screen text-primary">
      <ContinuousSampleSizeCalculator />
      <BinarySampleSizeCalculator />
    </div>
  );
}

export default App;
