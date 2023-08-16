import './App.css';

import SimpleTable from "./SimpleTable/SimpleTable";

function App() {
  const rows = [
    {id: 23, name: "Test"},
    {id: 24, name: "One"},
    {id: 25, name: "Tester"},
    {id: 26, name: "Fig"},
    {id: 27, name: "Jam"},
    {id: 28, name: "mouse"},
    {id: 29, name: "keyboard"},
    {id: 30, name: "three"},
  ]

  const headers = [
    {
      label: 'ID',
      accessor: 'id',
      canSort: false
    },
    {
      label: 'Name',
      accessor: 'name',
      canSort: true,
    }
  ]

  const handlePaginate = (pagination) => {
    console.log('handle paginate')
  }

  const handleSelect = (selected) => {
    console.log('selected', selected)
  }

  const tableState = {
    canSelect: true,
  }
  return (
    <div className="App">
      <SimpleTable handleSelect={handleSelect} initialTableState={tableState} rows={rows} headers={headers} handlePaginate={handlePaginate} totalCount={1} />
    </div>
  );
}

export default App;
