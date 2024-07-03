import { useEffect, useState } from "react"
import LoadingDatas from "../components/LoadingDatas"
import { RestaurantPreviewCard } from "../components/RestaurantPreviewCard"
import useYelpSearchRestaurant, { Price } from "../hooks/useYelpSearchRestaurant"
import ICategory from "../interfaces/ICategory"
import IRestaurant from "../interfaces/IRestaurant"
import ErrorFetchDatas from "../components/ErrorFetchDatas"

const FOODS_CATEGORIES:ICategory[] = [
    {alias:"belgian", title:"Belgian"},
    {alias:"brasseries", title:"Brasseries"},
    {alias:"italian", title:"Italian"},
    {alias:"burgers", title:"Burgers"},
    {alias:"hotdogs", title:"Fast Food"}
]

interface Props
{
    cardClicked : (restaurant:IRestaurant) => void,
    onNewSearch : () => void
}

const BRUSSELS_LOCATION = 'brussels'

export default function PageRestaurantFinder({cardClicked, onNewSearch}:Props)
{
    const {restaurants, loading, error, setSearchCriteria} = useYelpSearchRestaurant(BRUSSELS_LOCATION)

    const [location, setLocation] = useState('');
    const [category, setCategory] = useState(undefined as ICategory | undefined);
    const [filterName, setFilterName] = useState('');
    const [price, setPrice] = useState('' as Price);
    const [rating, setRating] = useState(false);

    const restaurantsFiltered = restaurants.filter(r => r.name.includes(filterName))

    useEffect(() => newSearch(), [category, price, rating])

    const newSearch = () => {
        setSearchCriteria(`${BRUSSELS_LOCATION} ${location}`, category ? [category.alias] : [], price.trim() !== '' ? [price] : [], rating)
        onNewSearch()
    }

    return <div>
        <div>
            <span>Find</span>
            <input placeholder='Type an adress' onChange={e => setLocation(e.target.value)}/>
            <button onClick={_ => newSearch()}> Search </button>
            </div>
            <div>
            {FOODS_CATEGORIES.map((c, id) => <button
                key={id} 
                style={{ background : category?.alias == c.alias ? 'gray' : '#1a1a1a' }}
                onClick={_ => setCategory(category?.alias == c.alias ? undefined : c)}>
                    {c.title}
            </button>)}
            
            <select defaultValue='' onChange={e => setPrice(e.target.value as Price)}>
                <option value=""></option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
            </select>

            <input type="checkbox" onChange={e => setRating(e.target.checked)} /> Best rating
            
            </div>
            <div> <input placeholder='Filter critere' onChange={e => setFilterName(e.target.value)}/> </div>
            <div>
            
            {loading ? <LoadingDatas /> :
            error ? <ErrorFetchDatas /> : 
            <div>
                {restaurantsFiltered.map(r =>
                <div key={r.id}>
                    <RestaurantPreviewCard restaurant={{...r, image_url : r.image_url}} cardClicked={() => cardClicked(r)} />
                </div>)}
            </div>}
            
        </div>
    </div>
}