// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import store from './store/index'
import Login from './page/login'
import Signup from './page/signup'
import Admin from './page/admin'
import Student from './page/stu/index'
import St from './page/stu/stu'
import Do from './page/do'
import Empty from './page/empty'
import Drawing from './page/admin/components/drawing'


export default class App extends Component {
    render() {
        return (
            <Provider store= { store }>
                <BrowserRouter>
                    <Route path= '/' component= { Empty } />
                    <Route path= '/admin' component= { Admin } />

                    <Route path= '/login' component= { Login } />
                    <Route path= '/signup' component= { Signup } />
                    <Route path="/st" component={ St }></Route>
                    <Route path="/stu/:id" component={ Student }></Route>
                    <Route path="/course/:id" component={ Do }></Route>
                    <Route path="/drawing" component={ Drawing }></Route>
                </BrowserRouter>
            </Provider>
        )
    }
}
