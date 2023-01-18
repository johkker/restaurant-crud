import { Type } from '../entities';

interface OpenHour {
  from: string;

  to: string;
}

interface OpenTimes {
  sunday: OpenHour;

  monday: OpenHour;

  tuesday: OpenHour;

  wednesday: OpenHour;

  thursday: OpenHour;

  friday: OpenHour;

  saturday: OpenHour;

  holydays: OpenHour;
}

interface CreateRestaurantInput {
  name: string;
  cnpj: string;
  address: string;
  phone: string;
  type: string;
  openTimes: OpenTimes;
}

interface UpdateOpenTimesInput {
  sunday?: OpenHour;
  monday?: OpenHour;
  tuesday?: OpenHour;
  wednesday?: OpenHour;
  thursday?: OpenHour;
  friday?: OpenHour;
  saturday?: OpenHour;
  holydays?: OpenHour;
}
interface UpdateRestaurantInput {
  name?: string;
  cnpj?: string;
  address?: string;
  phone?: string;
  type?: string;
  openTimes?: UpdateOpenTimesInput;
}

export {
  OpenTimes,
  OpenHour,
  CreateRestaurantInput,
  UpdateRestaurantInput,
  UpdateOpenTimesInput,
};
