export type Product={id:string;slug:string;name:string;description:string;short_description:string;price_pence:number;stock:number;is_available:boolean;is_visible:boolean;category:string;image_url:string|null;allergens:string[]};
export type CartItem=Pick<Product,"id"|"slug"|"name"|"price_pence"|"image_url">&{quantity:number};
