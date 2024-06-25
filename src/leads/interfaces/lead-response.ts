interface IResponsible {
    id: number;
    name: string;
}

interface IContactCustomFieldValue {
    value: string;
}

interface IContactCustomField {
    name: string;
    values: IContactCustomFieldValue[];
}

interface IContact {
    id: number;
    name: string;
    customFieldsValues: IContactCustomField[];
}

export interface ILeadResponse {
    name: string;
    budget: number;
    status: string;
    responsible: IResponsible;
    createdAt: number;
    contacts: IContact[];
}