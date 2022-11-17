import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import Spin from '../spinner/Spin';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import './charList.scss';


const  CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(540);
    const [charEnded, setCharEnded] = useState(false);
    

    const marvelService = new MarvelService();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        setChars(chars => [...chars, ...newCharList]);
        setLoading(false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }

    const onError = () => {
        setError(true);
        setLoading(loading => false);
    }

    const renderItems = (chars) => {
       
        const elements = chars.map((item) => {

            const imgStyle = (item.thumbnail.includes('image_not_available')) ? {objectFit: "fill"} : null;
 
            return (
                <li 
                tabIndex={0}
                className="char__item" 
                key={item.id}
                onFocus={()=> { props.onCharSelected(item.id) }}>
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

    const list = renderItems(chars);
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spin/> : null;
    const content = (errorMessage || spinner || list);

    return (
        
        <div className="char__list">
                {content}
            <button  
            className="button button__main button__long"
            disabled={newItemLoading}
            style={{display: charEnded ? 'none' : 'block'}}
            onClick={()=> onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;