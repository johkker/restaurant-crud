import { Type } from '../entities';
import GlobalError from '../errors';
import { CreateTypeInput } from '../interfaces';
import { typeRepository } from '../repositories';

const getAllTypes = async () => {
  const types = await typeRepository.find({ relations: ['restaurants'] });
  if (!types)
    throw new GlobalError(
      'There are no types registered. Contact an admin.',
      404
    );
  return types;
};

const createType = async (data: CreateTypeInput) => {
  const { name } = data;
  const type = await typeRepository.findOne({
    where: { name: name },
  });
  if (type) throw new GlobalError('Type already exists', 400);

  const newType = new Type();
  newType.name = name;

  typeRepository.create(newType);
  await typeRepository.save(newType);

  return 'Type added successfully';
};

const deleteType = async (id: string) => {
  const numberId = Number(id);
  const type = await typeRepository.findOne({
    where: { id: numberId },
    relations: ['restaurants'],
  });
  if (!type) throw new GlobalError('Type not found', 404);
  if (type.restaurants.length > 0)
    throw new GlobalError('Type has restaurants', 400);

  await typeRepository.delete({ id: numberId });

  return 'Type deleted successfully';
};

export { getAllTypes, createType, deleteType };
