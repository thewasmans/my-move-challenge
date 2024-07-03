import IRestaurant from "../interfaces/IRestaurant";

interface Props
{
    restaurant : IRestaurant
}

export function RestaurantCard ({restaurant} : Props)
{
    const {name, image_url: urlImageCover, price: prices, phone, rating, coordinates, location, categories, url: yelpURL} = restaurant
    
    return (
    <div>
      <h3>{name}</h3>
      <img src={urlImageCover} />
      <div>Price {prices}</div>
      <div>Phone {phone}</div>
      <div>Rating {rating}</div>
      <div><a href={`https://maps.google.com/?q=${coordinates.longitude},${coordinates.latitude}`}>Maps location</a></div>
      <div><a href={yelpURL}> Yelp url </a></div>
      <div>{location.display_address.map((l, i) => <span key={i}> {l} </span>)}</div>
      <div>{categories.map((c, i) => <span key={i}> {c.title} </span>)}</div>
    </div>
  );
}
