import ICategory from "./ICategory"

export default interface IRestaurant
{
    id : string,
    name : string,
    image_url : string,
    url : string,
    categories : ICategory[],
    rating : number,
    coordinates : {latitude : number, longitude : number}
    price : string
    location : {display_address : string []}
    phone : string
}