export interface Animal {
  id: number;
  name: string;
  type: string;
  age: number;
  breed?: string;
  location?: string;
  gender?: string;
  description?: string;
  image?: string;
}
export interface Value {
  title: string;
  description: string;
  icon: "heart" | "paw" | "shield";
}

export interface Story {
  title: string;
  description: string;
  image?: string;
}

export interface AboutData {
  title: string;
  description: string;
  image?: string;
  story?: Story;
  values?: Value[];
}
