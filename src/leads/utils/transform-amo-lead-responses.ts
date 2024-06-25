import { IContactsAmoResponse } from '../interfaces/contacts-amo-response';
import { ILeadsAmoResponse } from '../interfaces/lead-amo-response';
import { ILeadResponse } from '../interfaces/lead-response';
import { IPipelinesAmoResponse } from '../interfaces/pipelines-amo-response';
import { IUsersAmoResponse } from '../interfaces/users-amo-response';

export const transformAmoLeadResponses = (
  leads: ILeadsAmoResponse,
  users: IUsersAmoResponse,
  pipelines: IPipelinesAmoResponse,
  contacts: IContactsAmoResponse,
): ILeadResponse[] => {
  const usersMap = users._embedded.users.reduce((map, user) => {
    if (!map[user.id]) {
      map[user.id] = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
    return map;
  }, {});

  const statusesMap = pipelines._embedded.pipelines.reduce((map, pipeline) => {
    pipeline._embedded.statuses.forEach((status) => {
      if (!map[status.id]) {
        map[status.id] = status.name;
      }
    });
    return map;
  }, {});

  const contactsMap = contacts._embedded.contacts.reduce((map, contact) => {
    if (!map[contact.id]) {
      map[contact.id] = {
        id: contact.id,
        name: contact.name,
        customFieldsValues:
          contact.custom_fields_values.map((customField) => ({
            name: customField.field_name,
            values: customField.values.map(
              (customFieldValue) => customFieldValue.value,
            ),
          })) || null,
      };
    }
    return map;
  }, {});

  return leads._embedded.leads.map((lead) => {
    return {
      name: lead.name,
      budget: lead.price,
      status: statusesMap[lead.status_id],
      responsible: usersMap[lead.responsible_user_id],
      createdAt: lead.created_at,
      contacts: lead._embedded.contacts.map(
        (contact) => contactsMap[contact.id],
      ),
    };
  });
};
