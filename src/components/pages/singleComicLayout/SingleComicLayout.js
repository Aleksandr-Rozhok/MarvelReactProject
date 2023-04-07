import { Link, useNavigate  } from "react-router-dom";
import { Helmet } from "react-helmet";

import "./singleComicLayout.scss"

const SingleComicLayout = ({data}) => {

    const navigate = useNavigate();
    const {thumbnail, title, desc, pageCount, language, price} = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title> 
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{desc}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link onClick={() => navigate(-1)} className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicLayout;