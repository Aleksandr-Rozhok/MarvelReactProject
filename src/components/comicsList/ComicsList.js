import './comicsList.scss';

import {useList} from '../../hooks/list.hook';
import { Link } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
    const {list, offset, newItemLoading, itemEnded, loading, error, onRequest} = useList({limit: 8, type: "comics"});

    let comicsList = [];

    if (list) {
        comicsList = list.map((item) => {
            return <ComicListItem 
                        key={item.id} 
                        id={item.id}
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

    const {title, img, price, id} = props;

    return (
        <li className="comics__item" key={id}>
            <Link to={`/comics/${id}`}>
                <img src={img} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{`${price}$`}</div>
            </Link>
        </li>
    )
}

export default ComicsList;