import { Address } from "./addres";

export interface HousingRegister{

    name: string;
    desc: string;
    price: number;
    address: Address;
    ownerId: string;
}