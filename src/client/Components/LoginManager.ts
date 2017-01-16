import {ApiConnection} from "./ApiConnection";

export class LoginManager {
    public static login(state: any) {
        return ApiConnection.login(state);
    }
}