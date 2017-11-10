
require('style/main.scss');

// require('component/demo.js');

// require('component/counterByDOM');
// require('component/counterByRedux');

import { createStore, applyMiddleware, bindActionCreators} from 'redux';
import thunk from 'redux-thunk';
import {Provider, connect} from 'react-redux';
import reducer from 'reducer';
import * as actionsCreators from 'actions';

import CounterPanel from 'component/counter/CounterPanel';


const store = createStore(reducer, applyMiddleware(thunk));


// let propTypes = {
//     actions: PT.objectOf(PT.func),
//     state: PT.shape({
//         A: PT.arrayOf(PT.object),
//         B: PT.arrayOf(PT.object)
//     }),
//     addCounter: PT.func
// }

export default class App extends Component{
    constructor(props){
        super(props);
    }

    render(){

        let {
            A, B, addCounter, addIfOdd, asyncAdd, decrement, increment
        } = this.props;

        return (
            <div>
                <CounterPanel {...{
                    data: A, actions: {addIfOdd, asyncAdd, decrement, increment}, addCounter,
                    panelName: 'A'
                }}/>
                <CounterPanel {...{
                    data: B, actions: {addIfOdd, asyncAdd, decrement, increment}, addCounter,
                    panelName: 'B'
                }}/>
            </div>
        );
    }
}

// App.propTypes = propTypes;

App = connect(
    state => state,
    dispatch => bindActionCreators(actionsCreators, dispatch)
)(App);

ReactDOM.render(
    <Provider
        store={store}
    >
        <App/>
    </Provider>
    ,
    document.getElementById('root')
);
