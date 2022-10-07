import APITable from "./components/table/APITable";
import Tabs, { ITab } from "./components/tabs/Tabs";

function App() {
  const tabs: ITab[] = [
    {
      id: "api-table",
      title: "API table",
      body: <APITable />
    },
    {
      id: "dummy-table",
      title: "Dummy table",
      body: <table>
        <thead>
          <tr><th>S/N</th></tr>
        </thead>
      </table>
    }
  ]
  return (
    <section>
      <Tabs tabs={tabs} />
    </section>
  );
}

export default App;
