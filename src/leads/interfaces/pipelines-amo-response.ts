interface IPipelineStatus {
  id: number;
  name: string;
}

interface IPipeline {
  id: number;
  name: string;
  _embedded: {
    statuses: IPipelineStatus[];
  };
}

export interface IPipelinesAmoResponse {
  _embedded: {
    pipelines: IPipeline[];
  };
}
