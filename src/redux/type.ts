export interface loginState {
    isLoggedIn : boolean,
    loading: boolean,
    user: any | null,
    error: null | string,
    token?: null | boolean
}