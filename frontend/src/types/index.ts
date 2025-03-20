export type ICommissionType = {
  label: string;
  value: number;
  add_character?: number;
};

export type ICommissionFee = {
  label: string;
  value: number;
};

export type ICommissionInfo = {
  types: ICommissionType[];
  fees: ICommissionFee[];
  currency: string;
};

export type IProject = {
  _id: string;
  project_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  description: string;
  notes: string[];
  paid: boolean;
  duedate: string;
  images: string[];
  amount_paid: number;
};

export type IAppContextType = {
  backendUrl: string;
  token: string;
  setToken: (token: string) => void;
  navigate: (path: string, options?: object) => void;
}
