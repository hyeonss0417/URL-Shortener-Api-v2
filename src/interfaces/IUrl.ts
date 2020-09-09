export interface IUrl {
  id: number;
  url: string;
  access_key: string;
  created_date: string;
  access_count: number;
}

export interface IUrlInputDTO {
  url: string;
  access_key?: string;
}
