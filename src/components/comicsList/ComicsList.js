import './comicsList.scss';

import {useList} from '../../hooks/list.hook';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
    const {list, offset, newItemLoading, itemEnded, loading, error, onRequest} = useList({limit: 8, type: "comics"});

    debugger
    let comicsList = [];

    if (list) {
        comicsList = list.map((item, i) => {
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
                style={{'display': itemEnded ? "none" : "block"}} 
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