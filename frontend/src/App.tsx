import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";

function App() {
  const [showAlert, setShowAlert] = useState(false);

  const toggleAlert = () => setShowAlert(!showAlert);

  const cities = ["New York", "Paris", "Rome", "London", "Tokyo", "Sydney"];

  return (
    <div>
      {showAlert && (
        <Alert onClose={toggleAlert}>
          <strong>Holy guacamole!</strong> You should check in on some of those
          fields below.
        </Alert>
      )}
      <Button color="primary" onClick={toggleAlert}>
        Click me
      </Button>
      <ListGroup
        items={cities}
        heading={"Cities"}
        onItemSelect={function (item: string): void {}}
      />
    </div>
  );
}

export default App;
