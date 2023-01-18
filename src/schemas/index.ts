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

const openTimesSchema = yup.object().shape({
  sunday: openHoursSchema.required(),
  monday: openHoursSchema.required(),
  tuesday: openHoursSchema.required(),
  wednesday: openHoursSchema.required(),
  thursday: openHoursSchema.required(),
  friday: openHoursSchema.required(),
  saturday: openHoursSchema.required(),
  holydays: openHoursSchema.required(),
});

export const restaurantSchema = yup.object().shape({
  name: yup.string().required(),
  cnpj: yup.string().required(),
  address: yup.string().required(),
  phone: yup.string().required(),
  type: typeSchema.required(),
  openTimes: openTimesSchema.required(),
});
