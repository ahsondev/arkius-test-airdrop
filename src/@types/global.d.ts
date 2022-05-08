interface IAction {
  type: string;
  payload?: any;
}

interface IMetadataProperty {
  trait_type: string;
  value: any;
}

interface IAsset {
  image: string;
  external_url: string;
  name: string;
  attributes: IMetadataProperty[];
}
