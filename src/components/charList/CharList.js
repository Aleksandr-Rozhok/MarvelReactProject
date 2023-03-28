import { useRef } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';

import { useList } from '../../hooks/list.hook';
import CharListItem from '../charListItem/charListItem';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = (props) => {
    const {list, offset, newItemLoading, itemEnded, loading, error, onRequest} = useList({limit: 9, type: "characters"});
    const myRef = useRef();

    const addActiveClass = async (i) => {
        document.querySelector(".char__item_selected")?.classList.remove("char__item_selected");
        myRef.current.children[i]?.classList.add("char__item_selected");
    }
    
    let charList = [];

    if (list) {
        charList = list.map((item, i) => {
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
                    style={{'display': itemEnded ? "none" : "block"}} 
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