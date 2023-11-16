import { useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";

function App() {
  const [showAlert, setShowAlert] = useState(false);

  const toggleAlert = () => setShowAlert(!showAlert);

  return (
    <div>
      {showAlert && (
        <Alert onClose={toggleAlert}>
          <strong>Holy guacamole!</strong> You should check in on some of those
          fields below.
        </Alert>
      )}
      <Button color="dark" onClick={toggleAlert}>
        Click me
      </Button>
    </div>
  );
}

export default App;
