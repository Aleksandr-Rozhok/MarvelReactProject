import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './charInfo.scss';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }

        onCharsLoaded();
        clearError();
        getCharacter(charId)
            .then(onCharsLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharsLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    let {name, description, thumbnail, homepage, wiki, comics} = data;

    const styleForImg = thumbnail.includes("image_not_available") ? {objectFit: "contain"} : null;
    let noComics = ""
    let tenComics;

    if (comics.length === 0) {
        noComics = "No comics with this character"
    } else {
        tenComics = Array.from(comics);
        tenComics.length = 10;
    }

    return (
        <>
            <div className="char__basics">
                <img style={styleForImg} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    noComics ? noComics : tenComics.map((item, i) => {
                        return (
                            <li key={i} className="char__comics-item">
                                <Link to={item.resourceURI.slice(-12)}>
                                    {item.name}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;