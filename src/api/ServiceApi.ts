class ServiceApi {

    private readonly SERVICES_URL: string = 'https://673423afa042ab85d1190055.mockapi.io/api/v1/services';

    async getServices(){
        return await fetch(this.SERVICES_URL);
    }

    async getServiceDetail(id: string | undefined){
        return await fetch(`${this.SERVICES_URL}/${id}`)
    }

}

export default ServiceApi;