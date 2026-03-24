// let data = {
//     name :"누나네 식당",
//     category:'western',
//     address:{
//         city:'incheoi',
//         detail:'somewhere',
//         zipCode:234534
//     },
//     menu :[{name :'rose pasta', price:2000, category:"pasta"}, {name :'garlic steak', price:3000, category:"steak"}] 

export type Restaurant = {
    name: string;
    category:string; 
    address: Address;
    menu: Menu[]

}
export type Address={
    city:string;
    detail:string;
    zipCode:number;
}

export type Menu={
    name:string;
    price:number;
    category:string;
}

export type AddressWithoutZip = Omit<Address, 'zipCode'>
export type RestaurantOnlyCategory = Pick<Restaurant, 'category'>

export type ApiResponse<T>={
    data:[],
    totalPage:number,
    page:number,
}

export type ResturantResponse= ApiResponse<Restaurant>
export type MenuResponse=ApiResponse<Menu>