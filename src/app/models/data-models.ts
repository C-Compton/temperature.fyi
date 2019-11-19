interface ClimateData {
  city: City;
  dataset: string;
  scenario: string;
  climate_models: string[];
  variables: string[];
  data: Data;
}

interface Data {
  "1950": _1950;
  "1951": _1950;
  "1952": _1952;
  "1953": _1950;
  "1954": _1950;
  "1955": _1950;
  "1956": _1952;
  "1957": _1950;
  "1958": _1950;
  "1959": _1950;
  "1960": _1952;
  "1961": _1950;
  "1962": _1950;
  "1963": _1950;
  "1964": _1952;
  "1965": _1950;
  "1966": _1950;
  "1967": _1950;
  "1968": _1952;
  "1969": _1950;
  "1970": _1950;
  "1971": _1950;
  "1972": _1952;
  "1973": _1950;
  "1974": _1950;
  "1975": _1950;
  "1976": _1952;
  "1977": _1950;
  "1978": _1950;
  "1979": _1950;
  "1980": _1952;
  "1981": _1950;
  "1982": _1950;
  "1983": _1950;
  "1984": _1952;
  "1985": _1950;
  "1986": _1950;
  "1987": _1950;
  "1988": _1952;
  "1989": _1950;
  "1990": _1950;
  "1991": _1950;
  "1992": _1952;
  "1993": _1950;
  "1994": _1950;
  "1995": _1950;
  "1996": _1952;
  "1997": _1950;
  "1998": _1950;
  "1999": _1950;
  "2000": _1952;
  "2001": _1950;
  "2002": _1950;
  "2003": _1950;
  "2004": _1952;
  "2005": _1950;
}

interface _1952 {
  pr: number[];
  tasmax: number[];
  tasmin: number[];
}

interface _1950 {
  pr: (null | number)[];
  tasmax: (null | number)[];
  tasmin: (null | number)[];
}

interface City {
  id: number;
  type: string;
  geometry: Geometry;
  properties: Properties;
}

interface Properties {
  proximity: Proximity;
  name: string;
  admin: string;
  population: number;
  datasets: string[];
  region: number;
}

interface Proximity {
  ocean: boolean;
}

interface Geometry {
  type: string;
  coordinates: number[];
}
