import * as yup from 'yup';

export const typeSchema = yup.object().shape({
  name: yup.string().required(),
});

const openHoursSchema = yup.object().shape({
  from: yup
    .string()
    .required()
    .matches(
      /([0-9]{2}:[0-5]{1}[0-9]{1})/g,
      'Invalid time format on From field'
    ),
  to: yup
    .string()
    .required()
    .matches(/([0-9]{2}:[0-5]{1}[0-9]{1})/g, 'Invalid time format on To field'),
});

const openHoursChecker = yup.lazy((value) => {
  switch (typeof value) {
    case 'string':
      return yup
        .string()
        .required()
        .matches(/closed/gi, 'It can only be closed or an array of times')
        .transform((value) => {
          return value.toLowerCase();
        });
    default:
      return yup.array().of(openHoursSchema).required().min(1);
  }
});

const editOpenHoursChecker = yup.lazy((value) => {
  switch (typeof value) {
    case 'string':
      return yup
        .string()
        .matches(/closed/gi, 'It can only be closed or an array of times')
        .transform((value) => {
          return value.toLowerCase();
        });
    default:
      return yup.array().of(openHoursSchema).min(1);
  }
});

const openTimesSchema = yup.object().shape({
  sunday: openHoursChecker,
  monday: openHoursChecker,
  tuesday: openHoursChecker,
  wednesday: openHoursChecker,
  thursday: openHoursChecker,
  friday: openHoursChecker,
  saturday: openHoursChecker,
});

const editOpenTimesSchema = yup.object().shape({
  sunday: editOpenHoursChecker,
  monday: editOpenHoursChecker,
  tuesday: editOpenHoursChecker,
  wednesday: editOpenHoursChecker,
  thursday: editOpenHoursChecker,
  friday: editOpenHoursChecker,
  saturday: editOpenHoursChecker,
});

export const createRestaurantSchema = yup.object().shape({
  name: yup.string().required(),
  cnpj: yup.string().required(),
  address: yup.string().required(),
  phone: yup.string().required(),
  type: yup.string().required(),
  openTimes: openTimesSchema.required(),
});

export const updateRestaurantSchema = yup.object().shape({
  name: yup.string(),
  cnpj: yup.string(),
  address: yup.string(),
  phone: yup.string(),
  type: yup.string(),
  openTimes: editOpenTimesSchema,
});

export const checkOpenStatusSchema = yup.object().shape({
  timeToCheck: yup.date().required(),
});
