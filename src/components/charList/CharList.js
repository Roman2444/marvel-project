import { useState, useEffect, createRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


import Spin from '../spinner/Spin';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';


const  CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(540);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} =  useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) :  setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharListLoaded)
           
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        setChars(chars => [...chars, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9)
        setCharEnded(charEnded => ended)
    }


    const renderItems = (chars) => {
       
        const elements = chars.map((item) => {

            const imgStyle = (item.thumbnail.includes('image_not_available')) ? {objectFit: "fill"} : null;
 
            return (
                <CSSTransition key={item.id} timeout={500}  className="char__item" >
                    <li 
                        tabIndex={0}
                        className="char__item" 
                        onFocus={()=> { props.onCharSelected(item.id) }}>
                            <img src={item.thumbnail} alt="thumbnail" style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null} >
                    {elements}
                </TransitionGroup>
            </ul>
        )
    }

    const list = renderItems(chars);
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spin/> : null;
    
    return (
        
        <div className="char__list">
                {errorMessage}
                {spinner}
                {list}
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
    onCharSelected:  PropTypes.func.isRequired
}

export default CharList;