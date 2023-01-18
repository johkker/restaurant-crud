import { Type } from '../entities';
import GlobalError from '../errors';
import { typeRepository } from '../repositories';

const getAllTypes = async () => {
  const types = await typeRepository.find();
  if (!types)
    throw new GlobalError(
      'There are no types registered. Contact an admin.',
      404
    );
  return types;
};

const createType = async (name: string) => {
  const type = await typeRepository.findOne({ where: { name: name } });
  if (type) throw new GlobalError('Type already exists', 400);

  const newType = new Type();
  newType.name = name;

  typeRepository.create(newType);
  await typeRepository.save(newType);

  return 'Type added successfully';
};

const deleteType = async (id: number) => {
  const type = await typeRepository.findOne({ where: { id: id } });
  if (!type) throw new GlobalError('Type not found', 404);

  await typeRepository.delete({ id: id });

  return 'Type deleted successfully';
};

export { getAllTypes, createType, deleteType };
