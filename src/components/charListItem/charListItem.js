import './charListItem.scss';

const CharListItem = (props) => {   

    const {name, img, id, onCharSelected, addActiveClass, index} = props;
    const styleForImg = img.includes("image_not_available") ? {objectFit: "contain"} : null;

    return (
        <li key={id}
            tabIndex={index}
            onClick={() => {onCharSelected(); addActiveClass()}}
            onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                    onCharSelected();
                    addActiveClass()
                }
            }} 
            className="char__item">
            <img src={img} alt={name} style={styleForImg}/>
            <div className="char__name">{name}</div>
        </li>
    )
}

export default CharListItem;