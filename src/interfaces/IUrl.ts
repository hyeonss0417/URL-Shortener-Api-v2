export interface IUrl {
  id: number;
  url: string;
  accessKey: string;
  createDate: string;
  accessCount: number;
}

export interface IUrlInputDTO {
  url: string;
  accessKey?: string;
}
