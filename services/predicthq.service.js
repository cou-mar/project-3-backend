const axios = require('axios')
const predictHqApiKey = process.env.PREDICTHQ_API_KEY;

class PredictHQService {

    constructor(){
        this.axiosInstance = axios.create({
            baseURL: 'https://api.predicthq.com',
            headers: {
                Authorization: `Bearer ${predictHqApiKey}`
            }
        })
    }

    //get from predicthq
    getAllEvents(){
        return this.axiosInstance.get("/v1/events/?q=breast%20cancer")
    }


}

module.exports = PredictHQService