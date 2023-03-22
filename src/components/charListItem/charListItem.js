import { Component } from 'react';

import './charListItem.scss';

class CharListItem extends Component {    
    render() {
        const {name, img, id, onCharSelected} = this.props;
        const styleForImg = img.includes("image_not_available") ? {objectFit: "contain"} : null;

        return (
            <li onClick={onCharSelected} className="char__item">
                <img key={id} src={img} alt={name} style={styleForImg}/>
                <div className="char__name">{name}</div>
            </li>
        )
    }
}

export default CharListItem;