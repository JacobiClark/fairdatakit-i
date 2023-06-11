import React, { useEffect, useState } from 'react';
import { useForm, Controller, FormState } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { z } from 'zod';

type FormField = {
  name: string;
  label: string;
  type: string;
};

type FormInputs = Record<string, string>;

const Form = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));
const ButtonSubmit = styled(Button)(({ theme }) => ({
  width: '200px',
  marginTop: theme.spacing(2),
}));

async function fetchData() {
  try {
    const response = await fetch('/path/to/formData.json');
    const data = await response.json();
    return data.fields;
  } catch (error) {
    console.error('Error fetching form data:', error);
    return [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
      },
      {
        name: 'name2',
        label: 'Name 2',
        type: 'text',
      },
    ];
  }
}

function MetadataForm() {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const { handleSubmit, control, formState } = useForm<FormInputs>();
  useEffect(() => {
    const fetchFormData = async () => {
      const fields = await fetchData();
      setFormFields(fields);
    };

    fetchFormData();
  }, []);

  const buildValidationSchema = (inputType: string) => {
    switch (inputType) {
      case 'text':
        return z.string().min(1, 'Please enter at least 1 character');
      case 'email':
        return z.string().email();
      case 'number':
        return z.number().int();
      default:
        return z.string();
    }
  };

  const renderField = (field: FormField) => {
    const getErrorMessage = (error: z.ZodError) => {
      switch (error.code) {
        case 'too_small':
          return 'Please enter at least 1 character';
        case 'invalid_type':
          return 'Please enter a valid email address';
        default:
          return 'Please enter a valid value';
      }
    };

    const validateField = (value: string) => {
      const result = buildValidationSchema(field.type).safeParse(value);
      return result.success ? true : getErrorMessage(result.error);
    };

    switch (field.type) {
      case 'text':
        return (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            defaultValue=""
            rules={{ validate: validateField }}
            render={({ field: { ref, ...rest }, fieldState: { error } }) => (
              <TextField
                {...rest}
                label={field.label}
                type={field.type}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        );
      default:
        return null;
    }
  };

  const onSubmit = (data: FormInputs) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {formFields.map((field) => renderField(field))}
      <ButtonSubmit
        type="submit"
        variant="contained"
        color="primary"
        disabled={!formState.isValid} // Disable the button if the form is not valid
      >
        Submit
      </ButtonSubmit>
    </Form>
  );
}

export default MetadataForm;
