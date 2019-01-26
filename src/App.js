import React, { Component } from 'react';
import {PostContainers} from './containers';
import { Header } from './components'; 
class App extends Component {
    render(){
        return (
            <div>
                <Header/>
                <PostContainers/>
            </div>
        );
    }
}
export default App;