import {ApiConnection} from './ApiConnection';

export class Payments {
    public static perform(domainName: string, amount: number) {
        return ApiConnection.performPayment(domainName, amount);
    }
}
