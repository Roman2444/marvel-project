import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';


class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        console.log('DidMount**List')

        this.updateChar()
        // this.marvelService
        //     .getAllCharacters()
        //     .then(this.onCharLoaded)
        //     .catch(this.onError);
    }

    onCharLoaded = (chars) => {
        this.setState({
            chars, 
            loading: false
        })
        console.log('onCharLoaded--')
    }


    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        console.log('updateChar')
        
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    renderItems(chars) {
        const elements = chars.map((item) => {
            // const {name,thumbnail} = item;
            return (
                <li className="char__item">
                    <img src={item.thumbnail} alt="thumbnail"/>
                    <div className="char__name">{item.name}</div>
                </li>

            )
        });
        return (
            <ul className="char__grid">
            {elements}
            </ul>
        )

    }


    render() {
        const {chars, error, loading} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const list = this.renderItems(chars)
        // const content = (errorMessage || spinner || <View char={char}/>);
        
        // const {name, description, thumbnail, homepage, wiki} = chars;
    
            const name33 = chars[1]
            console.log('name33',  name33)
    
        return (
            
            <div className="char__list">
                    {list}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )

    }

}

// const CharListItem = ({name,thumbnail}) => {
//     return (
//         <li className="char__item">
//             <img src={thumbnail} alt="thumbnail"/>
//             <div className="char__name">{name}</div>
//         </li>
//     )
// }

export default CharList;