import APITable from "./components/table/APITable";
import Tabs, { ITab } from "./components/tabs/Tabs";

const DummyTable = () => {
  return <table>
    <thead>
      <tr>
        <th>S/N</th>
        <th>Data</th>
        </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>Lorem</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Ipsium</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Lorem</td>
      </tr>
    </tbody>
  </table>
}

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
      body: <DummyTable />
    }
  ]
  return (
    <section>
      <Tabs tabs={tabs} />
    </section>
  );
}

export default App;
