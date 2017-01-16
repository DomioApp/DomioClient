export interface IDomainItem {
    name: string;
    tags: string;
    price: number;
    isRented: boolean;
    isVisible: boolean;
    isDiscountEnabled: boolean;
    discount: number;
    owner: string;
    route53Data?: any;
}
