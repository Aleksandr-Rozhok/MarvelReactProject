import { useState, useEffect } from 'react';

import './comicsList.scss';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = (props) => {

    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicEnded, setComicEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset);
    }, [])

    const onRequest = (offset) => {
        onComicsListLoading(true);

        getAllComics(offset)
            .then(onComicsLoaded);
    }

    const onComicsListLoading = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
    }

    const onComicsLoaded = (newComic) => {
        let ended = false;
        if (newComic.length < 8) {
            ended = true;
        }

        setComics(comic => [...comic, ...newComic]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicEnded(comicEnded => ended);
    }

    let comicsList = [];

    if (comics) {
        comicsList = comics.map((item, i) => {
            return <ComicListItem 
                        key={item.id} 
                        img={item.thumbnail} 
                        title={item.title}
                        price={item.price} />
        })
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {errorMessage}
                {spinner}
                {comicsList}
            </ul>
            <button 
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{'display': comicEnded ? "none" : "block"}} 
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const ComicListItem = (props) => {   

    const {title, img, price} = props;

    return (
        <li className="comics__item">
            <a href="#">
                <img src={img} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{`${price}$`}</div>
            </a>
        </li>
    )
}

export default ComicsList;