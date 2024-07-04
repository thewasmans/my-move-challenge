import { useEffect, useState } from "react"
import LoadingDatas from "../components/LoadingDatas"
import { RestaurantPreviewCard } from "../components/RestaurantPreviewCard"
import useYelpSearchRestaurant, { Price } from "../hooks/useYelpSearchRestaurant"
import ICategory from "../interfaces/ICategory"
import IRestaurant from "../interfaces/IRestaurant"
import ErrorFetchDatas from "../components/ErrorFetchDatas"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Toggle } from "../components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group"
import { SelectGroup } from "@radix-ui/react-select"
import { HeaderPageRestaurant } from "../components/HeaderPageRestaurant"

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

    return <div className="max-w-6xl w-full">
        <HeaderPageRestaurant />
        <div className="flex items-center space-x-2">
            <Label>Find a restaurant</Label>
            <Input placeholder='Type an adress' onChange={e => setLocation(e.target.value)}/>
            <Button onClick={_ => newSearch()}> Search </Button>
        </div>

        <div className="flex justify-between items-center mb-6">
            <ToggleGroup type="single">
                {FOODS_CATEGORIES.map((c, id) => <div key={id} onClick={_ => setCategory(category?.alias == c.alias ? undefined : c)}><ToggleGroupItem value={c.alias}> {c.title} </ToggleGroupItem></div>)}
            </ToggleGroup>
            
            <Select value={price} onValueChange={value => setPrice(value === 'reset' ? '' : value as Price)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Price" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Price</SelectLabel>
                        <SelectItem value="reset">Reset</SelectItem>
                        <SelectItem value="1">$</SelectItem>
                        <SelectItem value="2">$$</SelectItem>
                        <SelectItem value="3">$$$</SelectItem>
                        <SelectItem value="4">$$$$</SelectItem>
                   </SelectGroup>
                </SelectContent>
            </Select>

            <Toggle onClick={_ => setRating(!rating)}>Best rating</Toggle>
        </div>

        <div> <Input placeholder='Filter critere' onChange={e => setFilterName(e.target.value)}/> </div>
            
        <div>
            <br/>
            
            {loading ? <LoadingDatas /> :
            error ? <ErrorFetchDatas /> : 
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {restaurantsFiltered.map(r =>
                <div key={r.id}>
                    <RestaurantPreviewCard restaurant={{...r, image_url : r.image_url}} cardClicked={() => cardClicked(r)} />
                </div>)}
            </div>}
            
        </div>
    </div>
}