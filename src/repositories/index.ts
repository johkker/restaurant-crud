import { Database } from '../data-source';
import { Restaurant, Type } from '../entities';

const restaurantRepository = Database.getRepository(Restaurant);
const typeRepository = Database.getRepository(Type);

export { restaurantRepository, typeRepository };
