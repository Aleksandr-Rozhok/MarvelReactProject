import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';

import MarvelService from '../../services/MarvelService';
import CharListItem from '../charListItem/charListItem';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
        activeChar: null
    }

    marvelService = new MarvelService();
    myRef = React.createRef();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();

        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharsLoaded = (newChars) => {
        let ended = false;
        if (newChars.length < 9) {
            ended = true;
        }

        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    // onCharFocus = async () => {
    //     await this.myRef.current.children[this.state.activeChar].focus()
    //     console.log("click!")
    // }

    addActiveClass = async (i) => {
        await this.setState({
            activeChar: i
        })

        document.querySelector(".char__item_selected")?.classList.remove("char__item_selected")
        await this.myRef.current.children[this.state.activeChar].classList.add("char__item_selected")
        // await this.myRef.onCharFocus()
    }
    
    render() {
        const {chars, loading, error, offset, newItemLoading, charEnded} = this.state
        let charList = [];

        if (chars) {
            charList = chars.map((item, i) => {
                return <CharListItem 
                            addActiveClass={() => this.addActiveClass(i)} 
                            onCharSelected={() => this.props.onCharSelected(item.id)}
                            index={i + 10} 
                            key={item.id} 
                            img={item.thumbnail} 
                            name={item.name} />
            })
        }

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? charList : null;
        
        return (
            <div className="char__list">
                <ul ref={this.myRef} className="char__grid">
                    {errorMessage}
                    {spinner}
                    {content}
                </ul>
                <button onClick={() => this.onRequest(offset)}
                        disabled={newItemLoading}
                        style={{'display': charEnded ? "none" : "block"}} 
                        className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;