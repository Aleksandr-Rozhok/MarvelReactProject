import { Link, useNavigate  } from 'react-router-dom';

import "./singleCharacterLayout.scss"

const SingleCharacterLayout = ({data}) => {

    const navigate = useNavigate();
    debugger
    const {thumbnail, name, description} = data;

return (
        <div className="single-char">
            <img src={thumbnail} alt={name} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
            <Link onClick={() => navigate(-1)} className="single-char__back">Back to all</Link>
        </div>
    )
}

export default SingleCharacterLayout;