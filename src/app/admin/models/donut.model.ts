export interface Donut {
    id?: string;//optional
    name: string;
    icon: string;
    price: number;
    promo?: 'new'| 'limited';
    description: string;
}
