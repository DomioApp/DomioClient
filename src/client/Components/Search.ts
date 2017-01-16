import {ApiConnection} from './ApiConnection';
export class Search {
    public static query(input: string): any[] {
        ApiConnection.find(input);
        return [];
    }
}
