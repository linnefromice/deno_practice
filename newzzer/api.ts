import { IArticle } from './type.d.ts';

class Api {
    // private property
    readonly #baseURL: string = "http://newsapi.org/v2/top-headlines";
    #apiKey: string = "";

    // set API key
    constructor(apiKey: string) {
        this.#apiKey = apiKey;
    }

    getNews = async (category: string | undefined, query: string | undefined): Promise<IArticle[] | string> => {
        let additional: string = "";
        let country: string ="jp"; // use US for USA, refer documentation for the complete list
        if (category) additional += `&category=${category}`;
        if (query) additional += `&q=${encodeURI(query)}`;
        try {
            const rawResult = await fetch(`${this.#baseURL}?language=jp&pageSize=10${additional}&apiKey=${this.#apiKey}&sortBy=popularity&country=${country}`);
            const result = await rawResult.json();
            if (result.status === "error") return "INVALID_KEY";
            let news: IArticle[] = result.articles;
            return news;
        } catch (err) {
            return "Cannot connect to server. Please check your internet connection.";
        }
    }
}

export default Api;