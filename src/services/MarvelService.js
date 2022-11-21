import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'; 
    const _apiKey = 'apikey=3f31870fbcc8fc0765d61a0131cfee59';
    const _baseOffset = 210;

    //2440c7a859b3bff0de7ce61825d29c6d


    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?orderBy=name%2Cmodified&limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
            if (!res.data.results[0].description) {
                res.data.results[0].description = "Sorry, no description found for this character"
            }
            else if (res.data.results[0].description.length > 200) {
                res.data.results[0].description = res.data.results[0].description.slice(0, 200) + '...'
            }
            
        return _transformCharacter(res.data.results[0]);
    }
    
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description, 
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url, 
            wiki: char.urls[1].url,
            comics: char.comics.items

        }
    }
    return {loading, error, getAllCharacters, getCharacter, clearError}

}

export default useMarvelService;