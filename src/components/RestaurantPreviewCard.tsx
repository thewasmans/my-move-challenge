import IRestaurant from "../interfaces/IRestaurant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface Props
{
    restaurant : IRestaurant
    cardClicked : () => void
}

export function RestaurantPreviewCard ({restaurant, cardClicked} : Props)
{
    const {name, image_url: urlImageCover, price: prices, rating, categories} = restaurant

    return <Card onClick={_ => cardClicked()}>
    <CardHeader style={{ background : `url(${urlImageCover})`, backgroundSize : 'cover', height : '10em'}}>
    </CardHeader>
    <CardContent>
    <CardTitle>{name}</CardTitle>
    <CardDescription>{categories.reduce((p,c) => `${p} ${c.title}`, '')} {rating} {prices}</CardDescription>
    </CardContent>
  </Card>
}
