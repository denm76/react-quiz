import React, {Component} from 'react'
import Layout from "./hoc/Layout/Layout";


class App extends Component{
  render() {
    return (
        <Layout>
            <div style={{width: 400, border:'2px solid black'}}>
                <h1>Layout works</h1>
            </div>
        </Layout>
    );
  }

}

export default App;
