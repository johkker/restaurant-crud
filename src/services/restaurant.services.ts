import { restaurantRepository, typeRepository } from '../repositories';
import GlobalError from '../errors';
import {
  CheckOpenStatusInput,
  CreateRestaurantInput,
  OpenTimes,
  UpdateRestaurantInput,
} from '../interfaces';
import { Restaurant } from '../entities';

const getAllRestaurants = async () => {
  const restaurants = await restaurantRepository.findAndCount({
    relations: ['type'],
  });

  if (!restaurants[1]) throw new Error('No restaurants found');

  return restaurants;
};

const getRestaurantById = async (id: string) => {
  const restaurant = await restaurantRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!restaurant) throw new Error('Restaurant not found');

  return {
    ...restaurant,
  };
};

const checkIsOpen = async (id: string, data: CheckOpenStatusInput) => {
  const { timeToCheck } = data;
  const restaurant = await restaurantRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!restaurant) throw new Error('Restaurant not found');

  const dayToCheck = timeToCheck
    .toLocaleString('en-us', { weekday: 'long' })
    .toLowerCase() as keyof OpenTimes;

  const timeToCheckString = timeToCheck.toLocaleTimeString('pt-br', {
    timeStyle: 'short',
  });

  const { openTimes } = restaurant;

  const openHours = openTimes[dayToCheck];

  if (openHours === 'closed') return false;

  const isOpen = openHours.some((openHour) => {
    const { from, to } = openHour;
    return from <= timeToCheckString && to >= timeToCheckString;
  });

  return isOpen;
};

const getRestaurantsByType = async (typeId: string) => {
  const id = Number(typeId);
  const restaurants = await typeRepository.findOne({
    where: { id: id },
    relations: ['restaurants'],
  });

  if (restaurants?.restaurants.length === 0)
    throw new GlobalError('No restaurants found in this category.', 404);

  return restaurants;
};

const createRestaurant = async (data: CreateRestaurantInput) => {
  const existingRestaurant = await restaurantRepository.findOne({
    where: [{ name: data.name }, { cnpj: data.cnpj }],
  });
  if (existingRestaurant)
    throw new GlobalError(
      'A restaurant with that name or cnpj is already registered in our database. If you think this is a mistake, cantact us.',
      409
    );

  const Type = await typeRepository.findOne({ where: { name: data.type } });

  if (!Type)
    throw new GlobalError(
      'Type not found. To verify all available types of restaurants, check our endpoint /types',
      404
    );

  const newRestaurant = new Restaurant();
  newRestaurant.name = data.name;
  newRestaurant.cnpj = data.cnpj;
  newRestaurant.address = data.address;
  newRestaurant.phone = data.phone;
  newRestaurant.type = Type;
  newRestaurant.openTimes = data.openTimes;

  restaurantRepository.create(newRestaurant);

  await restaurantRepository.save(newRestaurant);

  return {
    message: 'New restaurant created successfully',
    ...newRestaurant,
  };
};

const updateRestaurant = async (id: string, data: UpdateRestaurantInput) => {
  if (!data) throw new GlobalError('No data provided', 400);

  const restaurant = await restaurantRepository.findOne({ where: { id: id } });
  if (!restaurant) throw new GlobalError('Restaurant not found', 404);

  const newType = data.type
    ? await typeRepository.findOne({ where: { name: data.type } })
    : restaurant.type;

  if (data.openTimes) {
    for (const day in data.openTimes) {
      const dayObject = data.openTimes[day as keyof OpenTimes];
      if (dayObject) {
        restaurant.openTimes[day as keyof OpenTimes] = dayObject;
      }
    }
  }

  restaurant.name = data.name ? data.name : restaurant.name;
  restaurant.cnpj = data.cnpj ? data.cnpj : restaurant.cnpj;
  restaurant.address = data.address ? data.address : restaurant.address;
  restaurant.phone = data.phone ? data.phone : restaurant.phone;
  restaurant.type = newType ? newType : restaurant.type;

  await restaurantRepository.save(restaurant);

  return 'Restaurant info updated successfully';
};

const deleteRestaurant = async (id: string) => {
  const restaurant = await restaurantRepository.findOne({ where: { id: id } });
  if (!restaurant) throw new GlobalError('Restaurant not found', 404);

  await restaurantRepository.delete({ id: id });

  return 'Restaurant deleted successfully';
};

export {
  getAllRestaurants,
  getRestaurantById,
  getRestaurantsByType,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  checkIsOpen,
};
