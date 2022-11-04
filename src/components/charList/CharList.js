import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';


class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    renderItems(chars) {
       
        const elements = chars.map((item) => {

            const imgStyle = (item.thumbnail.includes('image_not_available')) ? {objectFit: "fill"} : null;
 
            return (
                <li 
                className="char__item" 
                key={item.id}
                onClick={()=>this.props.onCharSelected(item.id)}>
                    <img src={item.thumbnail} alt="thumbnail" style={imgStyle}/>
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
        const {chars, error, loading, newItemLoading, offset} = this.state;
        const list = this.renderItems(chars);
        
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = (errorMessage || spinner || list);
    
        return (
            
            <div className="char__list">
                    {content}
                <button  
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={()=> this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;