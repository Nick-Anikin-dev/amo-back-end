import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ILeadsAmoResponse } from './interfaces/lead-amo-response';
import { IPipelinesAmoResponse } from './interfaces/pipelines-amo-response';
import { ILeadResponse } from './interfaces/lead-response';
import { IContactsAmoResponse } from './interfaces/contacts-amo-response';
import { IUsersAmoResponse } from './interfaces/users-amo-response';
import { transformAmoLeadResponses } from './utils/transform-amo-lead-responses';

@Injectable()
export class LeadsService {
  constructor(private readonly httpService: HttpService) {}

  async find(query: string): Promise<ILeadResponse[]> {
    const [
      { data: leads },
      { data: users },
      { data: pipelines },
      { data: contacts },
    ] = await Promise.all([
      this.httpService.axiosRef.get<ILeadsAmoResponse>('/leads', {
        params: {
          query,
          with: 'contacts',
        },
      }),
      this.httpService.axiosRef.get<IUsersAmoResponse>('/users'),
      this.httpService.axiosRef.get<IPipelinesAmoResponse>('/leads/pipelines'),
      this.httpService.axiosRef.get<IContactsAmoResponse>('/contacts'),
    ]);

    return transformAmoLeadResponses(leads, users, pipelines, contacts);
  }
}
