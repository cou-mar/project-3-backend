const axios = require('axios')

class KomenService {

    constructor(){
        this.axiosInstance = axios.create({
            baseURL: 'https://sgk-publicapi.azurewebsites.net'
        })
    }

    getAllEvents(){

        const operationName = 'GetEvents';

        const query = `query GetEvents($coordinates: InputCoordinates, $address: String, $status: EventStatus, $years: [Int!], $range: Int) {
            events(
              coordinates: $coordinates
              address: $address
              status: $status
              years: $years
              range: $range
            ) {
              noResults
              expandedRange
              results {
                raceId
                name
                street
                city
                state
                zipcode
                startDate
                locationDescription
                status
                raceWebsite
                lat
                lng
                distance
                facebookGroup
                teamRaiserId
                __typename
              }
              additionalEvents {
                national {
                  raceId
                  name
                  street
                  city
                  state
                  zipcode
                  startDate
                  locationDescription
                  status
                  raceWebsite
                  teamRaiserId
                  lat
                  lng
                  distance
                  facebookGroup
                  national
                  featured
                  participationMode
                  eventType
                  email
                  cta
                  category
                  subCategory
                  __typename
                }
                __typename
              }
              __typename
            }
          }
          `

        const variables = {
            address: "",
            coordinates: {
                lat: "35.89594",
                lng: "-78.87249",
                state: "North Carolina"
            },
            range: 2000
        }
        
        //get from komen.org (but graphql!)
        return this.axiosInstance.post('/', {
            operationName,
            query,
            variables
        });

    }


}

module.exports = KomenService;