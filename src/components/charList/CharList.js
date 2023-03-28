import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';

import useMarvelService from '../../services/MarvelService';
import CharListItem from '../charListItem/charListItem';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();
    const myRef = useRef();

    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        onCharListLoading(true);

        getAllCharacters(offset)
            .then(onCharsLoaded);
    }

    const onCharListLoading = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
    }

    const onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        setChars(chars => [...chars, ...newChars]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const addActiveClass = async (i) => {
        document.querySelector(".char__item_selected")?.classList.remove("char__item_selected");
        myRef.current.children[i]?.classList.add("char__item_selected");
    }
    
    let charList = [];

    if (chars) {
        charList = chars.map((item, i) => {
            return <CharListItem 
                        addActiveClass={() => addActiveClass(i)} 
                        onCharSelected={() => props.onCharSelected(item.id)}
                        index={i + 10} 
                        key={item.id} 
                        img={item.thumbnail} 
                        name={item.name} />
        })
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    
    return (
        <div className="char__list">
            <ul ref={myRef} className="char__grid">
                {errorMessage}
                {spinner}
                {charList}
            </ul>
            <button onClick={() => onRequest(offset)}
                    disabled={newItemLoading}
                    style={{'display': charEnded ? "none" : "block"}} 
                    className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;