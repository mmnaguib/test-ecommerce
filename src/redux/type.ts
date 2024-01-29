export interface loginState {
    isLoggedIn : boolean,
    loading: boolean,
    user: any | null,
    error: null | string,
    token?: null | boolean
}
export interface variations {
    id: number,
    color: {color_name: string},
    size: {size_name: string},
    product_id: number,
    stock: number,
    quantity_sold: number,
}
export interface productState {
    id: number,
    name : string,
    description : string,
    brand : string,
    price : number,
    category : {id: number | string,name: string},
    variations: variations[],
    images: {url: string}[],
}

export interface categoryState {
    id: number,
    name : string,
    description : string,
}
export interface categoryType {
    categories: categoryState[],
    loading: boolean,
    error: null | string,
}
export interface sizeType {
    id?: number,
    size_name : string,
}export interface colorType {
    id?: number,
    color_name : string,
}
export interface productType {
    products: productState[],
    loading: boolean,
    error: null | string,
}
