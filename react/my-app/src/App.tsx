import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Address, Restaurant} from "./model/restaurant"
import Store from "./Store"
import BestMenu from './BestMenu';

let data: Restaurant= {
    name :"누나네 식당",
    category:'western',
    address:{
        city:'incheoi',
        detail:'somewhere',
        zipCode:234534
    },
    menu :[{name :'rose pasta', price:2000, category:"pasta"}, {name :'garlic steak', price:3000, category:"steak"}] 
}
const App : React.FC = ()=>  {
    const [myrestaurant, setMyRestaurant] = useState<Restaurant>(data)
    const changeAddress = (address:Address)=>{
        setMyRestaurant({...myrestaurant, address:address})
    }
    const showBestMenuName=(name:string)=>{
        return name
    }

  return (
    <div className="App">
    <Store info={myrestaurant} changeAddress={changeAddress}/>
    <BestMenu name="불고기피자" category="피자" showBestMenuName={showBestMenuName}/>
    </div>
  );
}

export default App;
