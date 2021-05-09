export interface IError {
    status?: number,
    error?: number,
    message?: string
}

export default interface IRoute {
    path: string;
    name: string;
    exact: boolean;
    component: any;
    props?: any
}

