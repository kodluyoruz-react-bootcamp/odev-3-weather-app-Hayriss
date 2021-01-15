import React, { Component } from 'react';
import "./weathericons/css/owfont-regular.css";

import Weather from "./components/Weather";
import AppContext from "./context";

class App extends Component {

  render() {
    return (

      <div className="App">
        <AppContext.Provider value={this.state}> 
              <Weather/> 
        </AppContext.Provider>        
      </div>

    );
  }
};

export default App;