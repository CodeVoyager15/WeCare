export type TMeta ={
    limit:number;
    page:number;
    total:number;
    totalPage?:number;
};

export type TResponseSuccess={
    data:any;
    meta?:TMeta;
}
export type TGenericErrorResponse={
    statusCode:number;
    message:string;
    errorMessages:string;
}