export class LocalStorage {

    public static saveData(idToken: string, userId: string): void {
        localStorage.setItem('idToken', idToken);
        localStorage.setItem('userId', userId);
    }

    public static getIdToken(): string {
        return localStorage.getItem('idToken');
    }

    public static getAccessToken(): string {
        return localStorage.getItem('accessToken');
    }

    public static getUserId(): string {
        return localStorage.getItem('userId');
    }

    public static clearProfile(): void {
        localStorage.removeItem('idToken');
        localStorage.removeItem('accessToken');
    }
}
