import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'

import Spin from '../spinner/Spin';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';



const ComicsList = (props) => {

    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);

    const {loading, error, getAllComics} =  useMarvelService();

        useEffect(() => {
        onRequest( true);
    }, [])

    const onRequest = (initial) => {
        initial ? setNewItemLoading(false) :  setNewItemLoading(true)
        getAllComics()
            .then((onCharListLoaded))
           
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true
        }

        setComics(comics => [...comics, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
   
    }

    const renderItems = (comics) => {
       
        const elements = comics.map((item) => {

            const imgStyle = (item.thumbnail.includes('image_not_available')) ? {objectFit: "fill"} : null;
 
            return (
                <li 
                tabIndex={0}
                className="comics__item" 
                key={item.id}
                // onFocus={()=> { props.onCharSelected(item.id) }}
                >
                    <a href="#">
                        <img src={item.thumbnail} alt="thumbnail" style={{"width": "225PX"}}/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>

                </li>
            )
        });

        return (
            <ul className="comics__grid">
            {elements}
            </ul>
        )
    }

    const list = renderItems(comics);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spin/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {list}
            <button onClick={()=> onRequest()} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;