import {useHttp} from "../hooks/http.hook"

const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=a6eacca719853626695a719b3c3ca442";
    const _baseOffset = 210;

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const getAllList = async (limit, type, offset = _baseOffset) => {
        const res = await request(`${_apiBase}${type}?limit=${limit}&offset=${offset}&${_apiKey}`);
        if (type === 'comics') {
            return res.data.results.map(_transformComics);
        } else {
            return res.data.results.map(_transformCharacter);
        }
    }

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            id: char.id,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (comic) => {
        return {
            title: comic.title,
            id: comic.id,
            price: comic.prices[0].price,
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            desc: comic.description,
            pageCount: comic.pageCount,
            language: comic.textObjects.language
        }
    }

    return {loading, error, clearError, getCharacter, getComic, getAllList}
}

export default useMarvelService;