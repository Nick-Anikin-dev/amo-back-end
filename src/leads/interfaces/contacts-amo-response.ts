interface IContactCustomFieldValue {
    value: string;
}

interface IContactCustomField {
    field_id: number,
    field_name: string,
    field_code: string,
    field_type: string,
    values: IContactCustomFieldValue[];
}

interface IContact {
    id: number;
    name: string;
    custom_fields_values: IContactCustomField[];
}

export interface IContactsAmoResponse {
    _embedded: {
        contacts: IContact[];
    }
}