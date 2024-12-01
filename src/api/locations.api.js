import axios from "axios";
export const locationsAPI = {
    async getAllLocations({name, page, type, dimension}){
        const res = await axios.get(`https://rickandmortyapi.com/api/location?page=${page}&name=${name}&type=${type}&dimension=${dimension}`)
        return res.data
    }
}