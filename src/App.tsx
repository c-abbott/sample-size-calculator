import Title from "./components/Title";
import ZTestSampleSizeCalculator from "./components/ZTestSampleSizeCalculator";

function App() {
  return (
    <div className="bg-dark-900 min-h-screen text-primary">
      <Title text="Z Test" />
      <ZTestSampleSizeCalculator />
    </div>
  );
}

export default App;
