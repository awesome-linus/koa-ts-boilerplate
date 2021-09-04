import { ParsedUrlQuery } from 'querystring';

export interface FetchUsersRequestQuery extends ParsedUrlQuery{
    limit: string;
    offset: string;
    sort: string; // ASC: sort=updated_at, DESC: sort=-updated_at
    fields: string;
}

export interface FetchUserRequestQuery extends ParsedUrlQuery{
    fields: string;
}
export interface FetchUserRequestParams extends Record<string, string> {
    userId: string;
}

export interface PostUserRequestBody {
    email: string;
    password: string;
}
