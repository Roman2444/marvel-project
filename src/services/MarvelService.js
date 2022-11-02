

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/'; 
    _apiKey = 'apikey=3f31870fbcc8fc0765d61a0131cfee59';

    //2440c7a859b3bff0de7ce61825d29c6d

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?orderBy=name%2Cmodified&limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
            if (!res.data.results[0].description) {
                res.data.results[0].description = "Sorry, no description found for this character"
            }
            else if (res.data.results[0].description.length > 200) {
                res.data.results[0].description = res.data.results[0].description.slice(0, 200) + '...'
            }
            
        return this._transformCharacter(res.data.results[0]);
    }
    
    _transformCharacter = (char) => {
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

}

export default MarvelService;