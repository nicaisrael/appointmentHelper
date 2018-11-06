import {Deserializable} from "./deserializable.model";

export interface IAppointment { //implements Deserializable
    Id: number;
    ProviderEmail: string;
    Description: string;
  	Start: string;
  	End: string;
  	Notes: string[];
  	Party: number[];

  	//deserialize(input: any) {
    //Object.assign(this, input);
    //return this;
  //}
}