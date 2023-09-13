export class SystemConstants {
    public static PROTOCOL = 'http';

    public static SERVER_MOCKUP = {
        HOST: '',
        API: {
            USER: {
                GET_ALL_USER: 'api/v1/users',
                GET: (id: string): string => `api/v1/users/${id}`,
                POST: 'api/v1/users',
                PUT: (id: string): string => `api/v1/users/${id}`,
                DELETE: (id: string): string => `api/v1/users/${id}`
            }
        },
    };
}
