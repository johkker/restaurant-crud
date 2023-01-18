import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { restaurantRepository, typeRepository } from '../repositories';
import GlobalError from '../errors';
import { currentDay, currentTime } from '../utils';
import {
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

const getAllOpenRestaurants = async () => {
  const openRestaurants = await restaurantRepository.findAndCount({
    relations: ['type'],
    where: {
      openTimes: {
        [currentDay]: {
          from: LessThanOrEqual(currentTime),
          to: MoreThanOrEqual(currentTime),
        },
      },
    },
  });

  if (!openRestaurants[1]) {
    throw new GlobalError("There's no restaurant open", 404);
  }

  return openRestaurants;
};

const getRestaurantById = async (id: string, isOpenEndpoint: boolean) => {
  const restaurant = await restaurantRepository.findOne({
    where: {
      id: id,
    },
  });

  if (!restaurant) throw new Error('Restaurant not found');

  const { openTimes } = restaurant;
  const { from, to } = openTimes[currentDay];

  const isOpen = currentTime < from || currentTime > to ? false : true;

  if (isOpenEndpoint) {
    return isOpen;
  }

  return {
    ...restaurant,
    isOpen: isOpen,
  };
};

const getRestaurantsByType = async (type: string) => {
  const restaurants = await restaurantRepository.findAndCount({
    relations: ['type'],
    where: {
      type: {
        name: type,
      },
    },
  });

  if (!restaurants[1])
    throw new GlobalError('No restaurants found in this category.', 404);

  return restaurants;
};

const createRestaurant = async (data: CreateRestaurantInput) => {
  const existingRestaurant = await restaurantRepository.findOne({
    where: { cnpj: data.cnpj, name: data.name },
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

  await restaurantRepository
    .save(newRestaurant)
    .then(() => {
      return newRestaurant;
    })
    .catch((err) => {
      console.log(err);
      throw new GlobalError(
        'Something went wrong while saving to the database. Try again. If error persists, contact an admin.',
        500
      );
    });
};

const updateRestaurant = async (id: string, data: UpdateRestaurantInput) => {
  const { name, cnpj, address, phone, type, openTimes } = data;
  const restaurant = await restaurantRepository.findOne({ where: { id: id } });
  if (!restaurant) throw new GlobalError('Restaurant not found', 404);

  const newType = type
    ? await typeRepository.findOne({ where: { name: type } })
    : restaurant.type;

  if (openTimes) {
    for (const day in openTimes) {
      const dayObject = openTimes[day as keyof OpenTimes];
      if (dayObject) {
        restaurant.openTimes[day as keyof OpenTimes] = dayObject;
      }
    }
  }

  restaurant.name = name ? name : restaurant.name;
  restaurant.cnpj = cnpj ? cnpj : restaurant.cnpj;
  restaurant.address = address ? address : restaurant.address;
  restaurant.phone = phone ? phone : restaurant.phone;
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

const getAllTypes = async () => {
  const types = await typeRepository.find();
  if (!types)
    throw new GlobalError(
      'There are no types registered. Contact an admin.',
      404
    );
  return types;
};

export {
  getAllRestaurants,
  getAllOpenRestaurants,
  getRestaurantById,
  getRestaurantsByType,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
