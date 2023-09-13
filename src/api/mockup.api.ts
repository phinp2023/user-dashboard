import { map } from 'rxjs/operators';
import { SystemConstants } from 'common/system-constants';
import { Observable } from "rxjs";
import HttpClient from './http-client';
import { APIHosts, ApiReduxHelpers } from './reduxHelpers';
import { User } from 'common/type-state';

class MockupApiController extends ApiReduxHelpers {
    ApiHost = APIHosts.Mockup;

    getAllUsers(): Observable<User[]> {
        return HttpClient.get(`${this.getHost(this.ApiHost)}/${SystemConstants.SERVER_MOCKUP.API.USER.GET_ALL_USER}`).pipe(
            map((res) => res as User[] || null)
        );
    }

    getUser(id: string): Observable<User> {
        return HttpClient.get(`${this.getHost(this.ApiHost)}/${SystemConstants.SERVER_MOCKUP.API.USER.GET_ALL_USER}/${id}`).pipe(
            map((res) => res as User || null)
        );
    }

    createUser(data: User): Observable<User | null> {
        return HttpClient.post(`${this.getHost(this.ApiHost)}/${SystemConstants.SERVER_MOCKUP.API.USER.POST}`, data).pipe(
            map((res) => res as any)
        );
    }

    editUser(data: User): Observable<User | null> {
        return HttpClient.put(`${this.getHost(this.ApiHost)}/${SystemConstants.SERVER_MOCKUP.API.USER.PUT(data.id)}`, data).pipe(
            map((res) => res as any)
        );
    }

    deleteUser(id: string): Observable<User | null> {
        return HttpClient.delete(`${this.getHost(this.ApiHost)}/${SystemConstants.SERVER_MOCKUP.API.USER.DELETE(id)}`).pipe(
            map((res) => res as any)
        );
    }
}

export const MockupApi = new MockupApiController();
