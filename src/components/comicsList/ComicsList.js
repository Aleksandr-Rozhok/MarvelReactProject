import { Link } from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';

import './comicsList.scss';

import {useList} from '../../hooks/list.hook';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = () => {
    const {list, offset, newItemLoading, itemEnded, loading, error, onRequest} = useList({limit: 8, type: "comics"});

    let comicsList = [];

    if (list) {
        let transitionSteak = 0;
        comicsList = list.map((item) => {
            transitionSteak < 8 ? transitionSteak++ : transitionSteak = 1;
            return <ComicListItem 
                        key={item.id} 
                        id={item.id}
                        img={item.thumbnail} 
                        title={item.title}
                        price={item.price}
                        transitionSteak={transitionSteak} />
        })
    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            <motion.ul 
                className="comics__grid"
                initial="hidden"
                animate="visible">
                {comicsList}
            </motion.ul>
            {spinner}
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

    const {title, img, price, id, transitionSteak} = props;

    const item = {
        visible: custom => ({ opacity: 1, x: 0, transition: { delay: custom * 0.2} }),
        hidden: { opacity: 0, x: 0 },
    }

    return (
        <motion.li 
            className="comics__item" 
            key={id}
            custom={transitionSteak}
            variants={item}>
            <Link to={`/comics/${id}`}>
                <img src={img} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{title}</div>
                <div className="comics__item-price">{`${price}$`}</div>
            </Link>
        </motion.li>
    )
}

export default ComicsList;