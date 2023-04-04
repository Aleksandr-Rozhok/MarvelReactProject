import { motion } from "framer-motion/dist/framer-motion"

import './charListItem.scss';

const CharListItem = (props) => {   

    const item = {
        visible: custom => ({ opacity: 1, x: 0, transition: { delay: custom * 0.2} }),
        hidden: { opacity: 0, x: 0 },
    }

    const {name, img, id, onCharSelected, addActiveClass, index, transitionSteak} = props;
    const styleForImg = img.includes("image_not_available") ? {objectFit: "contain"} : null;

    return (
        <motion.li 
            key={id}
            tabIndex={index}
            onClick={() => {onCharSelected(); addActiveClass()}}
            onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                    onCharSelected();
                    addActiveClass()
                }
            }} 
            className="char__item"
            custom={transitionSteak}
            variants={item}>
            <img src={img} alt={name} style={styleForImg}/>
            <div className="char__name">{name}</div>
        </motion.li>
    )
}

export default CharListItem;