import IRestaurant from "../interfaces/IRestaurant";

interface Props
{
    restaurant : IRestaurant
    cardClicked : () => void
}

export function RestaurantPreviewCard ({restaurant, cardClicked} : Props)
{
    const {name, image_url: urlImageCover, price: prices, rating} = restaurant
    
    return (
    <div onClick={_ => cardClicked()}>
      <div style={{ background : `url(${urlImageCover})`, height : '10em'}}></div>
      <div>
        <h4>{name}</h4>
        <div>{rating}</div>
      </div>
      <div>{prices}</div>
    </div>
  );
}
