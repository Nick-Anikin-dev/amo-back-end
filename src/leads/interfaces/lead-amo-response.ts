interface ILeadAmo {
    id: number,
    name: string,
    price: number,
    responsible_user_id: number,
    status_id: number,
    created_at: number,
    _embedded: {
        contacts: {
            id: number;
        }[];
    }
}

export interface ILeadsAmoResponse {
    _page: 1,
    _embedded: {
        leads: ILeadAmo[];
    }
}