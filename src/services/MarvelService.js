import {useHttp} from "../hooks/http.hook"

const useMarvelService = () => {
    const {loading, error, request, clearError} = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=a6eacca719853626695a719b3c3ca442";
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics)
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
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics}
}

export default useMarvelService;