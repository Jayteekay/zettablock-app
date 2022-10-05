import useFetchAPIs from "./data/useFetchAPIs";

function App() {
  const data = useFetchAPIs();
  return (
    <div>
      {JSON.stringify(data)}
    </div>

  );
}

export default App;
