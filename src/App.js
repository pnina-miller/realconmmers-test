import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import DetailesCard from './components/detailesCard'
import DataView from './components/dataView'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [data, setData] = useState()

  const getServerData = () => {
    axios.get('react_Response.json')
      .then(res => {
        setData(res.data);
      })
      .catch(error => alert('failed to load data error description: ' + error))
  }
  useEffect(getServerData, [])


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={() => <DataView data={data} getServerData={getServerData} />} />
          <Route exact path="/:cardTitle" render={() => <DetailesCard data={data} />} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
