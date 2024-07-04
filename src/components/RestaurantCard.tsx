import IRestaurant from "../interfaces/IRestaurant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface Props
{
    restaurant : IRestaurant
}

export function RestaurantCard ({restaurant} : Props)
{
    const {name, image_url: urlImageCover, price: prices, phone, rating, coordinates, location, categories, url: yelpURL} = restaurant
    
    return (
      <Card>
        <CardHeader className="bg-url" style={{ background : `url(${urlImageCover})`, backgroundSize : 'cover', height : '10em'}}>
        </CardHeader>
        <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{categories.reduce((p,c) => `${p} ${c.title}`, '')} {rating} {prices}</CardDescription>
        {phone}
        <div className="underline"><a href={`https://maps.google.com/?q=${coordinates.latitude},${coordinates.longitude}`}>Maps location</a></div>
        <div className="underline"><a href={yelpURL}> Yelp url </a></div>
        <div>{location.display_address.map((l, i) => <span key={i}> {l} </span>)}</div>
        </CardContent>
    </Card>
  );
}
