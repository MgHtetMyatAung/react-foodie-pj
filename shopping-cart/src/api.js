import axios from "axios";

const base_url="https://fakestoreapi.com";

export const getData= async(url)=>{
    const {data}= await axios.get(`${base_url}${url}`);
    return data;
}