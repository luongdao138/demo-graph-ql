import { useState } from 'react';

export const useForm = (initState, cb) => {
  const [values, setValues] = useState(initState);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cb();
  };

  return { values, handleChange, handleSubmit, errors, setErrors, setValues };
};
