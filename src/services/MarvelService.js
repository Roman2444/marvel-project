

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'; 
    _apiKey = 'apikey=3f31870fbcc8fc0765d61a0131cfee59';


    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?orderBy=name%2Cmodified&limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    }
    
}

export default MarvelService;