export interface IFile {
  url: string;
  secure_url: string;
  public_id: string;
}

interface ICategory {
  name: string;
}

export interface IProduct {
  _id: string;
  slug: string;
  name: string;
  category: ICategory;
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
  discount: {
    type: string;
    value: string;
    startDate: Date;
    endDate: Date;
  };
}

export interface IAmbassador {
  name: string;
  image: IFile;
  product: IProduct;
}

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  phone: string;
  specific_address: string;
  city: string;
  district: string;
  ward: string;
  role: "admin" | "customer";
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
  size: string;
}