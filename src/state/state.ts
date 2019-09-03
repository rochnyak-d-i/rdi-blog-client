export interface IStateAuth {
  isAuth: boolean,
  token: string
}

export interface IStateSearch {
  phrase: string,
  paramName: string
}

export interface IStateType {
  auth: IStateAuth,
  search: IStateSearch
}
