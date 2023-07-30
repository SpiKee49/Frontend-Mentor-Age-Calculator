import {
  FieldErrors,
  SubmitHandler,
  UseFormRegister,
  useForm,
} from 'react-hook-form';

import ArrowIcon from './assets/images/icon-arrow.svg';
import Duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';
import { useState } from 'react';

dayjs.extend(Duration);
type FormValues = {
  day: number;
  month: number;
  year: number;
};

function Field(props: {
  label: string;
  type: string;
  placeholder: string;
  fieldName: keyof FormValues;
  error?: FieldErrors[number];
  register: UseFormRegister<FormValues>;
}) {
  const {
    label,
    type,
    error,
    fieldName,
    placeholder,
    register,
  } = props;

  return (
    <label className={error ? 'text-red-500' : ''}>
      {label}
      <input
        type={type}
        placeholder={placeholder}
        className={error ? 'border-red-500 border-2' : ''}
        {...register(fieldName, {
          required: {
            value: true,
            message: 'This field is required',
          },
          pattern: {
            value: /^[0-9]+$/,
            message: 'Please enter a number',
          },
          max: {
            value:
              fieldName === 'day'
                ? 31
                : fieldName === 'month'
                ? 12
                : 2023,
            message: 'Not valid date',
          },
          min: {
            value: 1,
            message: 'Minimal date can be 1',
          },
        })}
      />
      {error && (
        <span className="text-xs tracking-normal normal-case italic font-normal mt-2">
          {error.message?.toString()}
        </span>
      )}
    </label>
  );
}

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [day, setDay] = useState<number>();
  const [month, setMonth] = useState<number>();
  const [year, setYear] = useState<number>();

  const onSubmit: SubmitHandler<FormValues> = ({
    year,
    month,
    day,
  }) => {
    const date1 = dayjs(`${year}-${month}-${day}`);
    const date2 = dayjs();
    const duration = dayjs.duration(date2.diff(date1));
    setDay(duration.days());
    setMonth(duration.months());
    setYear(duration.years());
  };

  return (
    <div className="w-full h-screen flex justify-center p-5 items-center">
      <div className="w-full max-w-[700px] bg-white gap-5 py-10 px-7 sm:p-10 rounded-2xl rounded-br-[150px] md:rounded-br-[200px] shadow-lg flex flex-col">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" border-gray-200 border-b-[2px] pb-16 sm:pb-20 mb-10 sm:mb-14 relative w-full"
        >
          <div className="flex flex-row gap-5 w-full">
            <Field
              label="Day"
              placeholder="DD"
              type="text"
              fieldName="day"
              error={errors.day}
              register={register}
            />
            <Field
              label="Month"
              placeholder="MM"
              type="text"
              fieldName="month"
              error={errors.month}
              register={register}
            />
            <Field
              label="Year"
              placeholder="YYYY"
              type="text"
              fieldName="year"
              error={errors.year}
              register={register}
            />
          </div>

          <button
            type="submit"
            className="flex md:translate-x-0 mx-auto left-0 md:left-auto right-0 justify-center items-center rounded-full w-14 h-14 sm:w-20 sm:h-20 bg-highlight hover:bg-black absolute -bottom-7 sm:bottom-[-2.5rem] "
          >
            <img
              src={ArrowIcon}
              alt=""
              className="scale-[50%] sm:scale-[80%]"
            />
          </button>
        </form>
        <div className="flex flex-col gap-0 text-[3rem] leading-10 sm:leading-[5rem] sm:text-[6rem] [&>*]:font-extrabold [&>*]:italic [&>*>span]:text-highlight [&>*]:mb-3">
          <p>
            <span>{year ?? '--'}</span> years
          </p>
          <p>
            <span>{month ?? '--'}</span> months
          </p>
          <p>
            <span>{day ?? '--'}</span> days
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
