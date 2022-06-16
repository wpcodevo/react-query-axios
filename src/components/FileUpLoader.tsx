import { FormHelperText } from '@mui/material';
import React, { useCallback } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';

type FileUpLoaderProps = {
  multiple?: boolean;
  name: string;
};
const FileUpLoader: React.FC<FileUpLoaderProps> = ({
  name,
  multiple = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { field } = useController({ name, control });

  const onFileDrop = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      const target = e.target as HTMLInputElement;
      if (!target.files) return;
      const newFile = Object.values(target.files).map((file: File) => file);
      field.onChange(newFile[0]);
    },

    [field]
  );
  return (
    <Controller
      name={name}
      defaultValue=''
      control={control}
      render={({ field: { name, onBlur, ref } }) => (
        <>
          <input
            type='file'
            name={name}
            onBlur={onBlur}
            ref={ref}
            onChange={onFileDrop}
            multiple={multiple}
            accept='image/jpg, image/png, image/jpeg'
          />
          <FormHelperText error={!!errors[name]}>
            {errors[name] ? errors[name]?.message : ''}
          </FormHelperText>
        </>
      )}
    />
  );
};

export default FileUpLoader;
