import axios from 'axios';

export default class AuthManager {
    public static authenticate(token: string, userId: string) {

        return axios
            .get(`http://api.domio.org/users/${userId}`, {
                headers: {'Authorization': token}
            })
    }
}