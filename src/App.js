import "./App.css";

import NewTable from "./pages/newTable";
// App.js
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import GetAllTables from "./pages/getalltables";
import NewCrud from "./pages/newcrud";
import CreateNewRow from "./pages/createnewrow";
import EditRow from "./pages/editrow";
import DeleteTable from "./pages/deleteTable";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-new-table" element={<NewTable />} />
        <Route path="/all-entities/:tablename" element={<NewCrud />} />
        <Route path="/getalltables/" element={<GetAllTables />} />
        <Route path="/delete/:tablename" element={<DeleteTable />} />
        <Route path="/create-new-row/:tablename" element={<CreateNewRow />} />
        <Route path="/edit-row/:tablename/:rowid" element={<EditRow />} />
      </Routes>
    </>
  );
}

export default App;
