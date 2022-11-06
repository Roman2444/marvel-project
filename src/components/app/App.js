import React, { Component } from 'react';

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

class App extends Component {

    state = {
        selectedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() { 
        return (
            <div className="app">
                <AppHeader/>
                <MySubHeader
                    left = {
                    <h2>это лево</h2>
                    <h2> my SubHeader</h2>
                    }
                   right={
                    <h2>это право!!!!</h2>
                    <h2> ***********</h2>
                    }
                />
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={this.onCharSelected}>
                                <h2>test********</h2>
                            </CharList>
                        </ErrorBoundary>
                        <CharInfo charId={this.state.selectedChar} />
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }

}

const MySubHeader = (props) => {
    return ( 
    <div>
        {props.left}
        {props.right}
    </div>
    )
}


export default App;