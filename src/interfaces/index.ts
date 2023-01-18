import { Type } from '../entities';

interface OpenHours {
  from: string;
  to: string;
}

interface OpenTimes {
  sunday: OpenHours[] | 'closed';
  monday: OpenHours[] | 'closed';
  tuesday: OpenHours[] | 'closed';
  wednesday: OpenHours[] | 'closed';
  thursday: OpenHours[] | 'closed';
  friday: OpenHours[] | 'closed';
  saturday: OpenHours[] | 'closed';
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
  sunday?: OpenHours[] | 'closed';
  monday?: OpenHours[] | 'closed';
  tuesday?: OpenHours[] | 'closed';
  wednesday?: OpenHours[] | 'closed';
  thursday?: OpenHours[] | 'closed';
  friday?: OpenHours[] | 'closed';
  saturday?: OpenHours[] | 'closed';
}
interface UpdateRestaurantInput {
  name?: string;
  cnpj?: string;
  address?: string;
  phone?: string;
  type?: string;
  openTimes?: UpdateOpenTimesInput;
}

interface CreateTypeInput {
  name: string;
}

interface CheckOpenStatusInput {
  timeToCheck: Date;
}
export {
  OpenTimes,
  OpenHours,
  CreateRestaurantInput,
  UpdateRestaurantInput,
  UpdateOpenTimesInput,
  CreateTypeInput,
  CheckOpenStatusInput,
};
