class NewsApi {

    private readonly NEWS_URL: string = 'https://673423afa042ab85d1190055.mockapi.io/api/v1/main';

    async getNews(){
        return await fetch(this.NEWS_URL);
    }

}

export default NewsApi;