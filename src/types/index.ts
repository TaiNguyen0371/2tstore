export interface IFile {
  url: string;
  secure_url: string;
  public_id: string;
}
export interface IProduct {
  slug: string;
  name: string;
  category: string;
  price: number;
  description: string;
  images: IFile[];
  isBanner: boolean;
  ambassador: {
    name: string;
    image: IFile;
  };
  sizes: [
    {
      size: string;
      quantity: number;
    }
  ];
}

export interface IAmbassador {
  name: string;
  image: IFile;
  product: IProduct;
}


export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "admin" | "customer";
}