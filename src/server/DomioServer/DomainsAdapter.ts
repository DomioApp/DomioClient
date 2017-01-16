import axios from 'axios';
const logger = require('tracer').colorConsole();

export class DomainsAdapter {
    public static  getByName(domainName: string, idToken: string) {
        return axios.get(`http://api.domio.org/Domains/${domainName}`, {
            headers: {
                Authorization: idToken
            }
        })
            .then((response: any) => {
                return response.data
            })
    }

    public static getAvailableDomainsCount() {
        return axios.get('http://api.domio.org/Domains/count')
    }

    public static getOwnedDomains(idToken: string, userId: string) {
        logger.trace(idToken);
        return axios.get(`http://api.domio.org/users/${userId}/domains`,
            {
                headers: {
                    Authorization: idToken
                }
            })
            .catch((err)=> {
                logger.trace(err);
            })

    }

    public static getRentedDomains() {
        return axios.get('http://api.domio.org/domains/rented')
    }

    public static getAvailableDomains(number: number, itemsCountPerPage: number) {
        return axios.get('http://api.domio.org/domains?filter={"where":{"isVisible":true}}')
    }

    public static getFeaturedDomains(number: number, itemsCountPerPage: number) {

    }

    public static getRecentlyRentedDomains(number: number) {

    }

    public static find(filters: any) {

    }
}