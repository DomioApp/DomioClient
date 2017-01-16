export interface IDomainAddRequestParams {
    tags: string;
    name: string;
    price: number;
    isFeatured: boolean;
    route53Data?: any;
}
