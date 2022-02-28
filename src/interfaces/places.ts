
export interface PlacesResponse {
  type:        string;
  query:       number[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:            string;
  type:          string;
  place_type:    string[];
  relevance:     number;
  properties:    Properties;
  text_en:       string;
  text_es:       string;
  place_name_en: string;
  text:          string;
  place_name:    string;
  center:        number[];
  geometry:      Geometry;
  context:       Context[];
}

export interface Context {
  id:           string;
  text_en:      string;
  text:         string;
  wikidata?:    string;
  language_en?: string;
  language?:    string;
  short_code?:  string;
}

export interface Geometry {
  type:        string;
  coordinates: number[];
}

export interface Properties {
  accuracy: string;
}
