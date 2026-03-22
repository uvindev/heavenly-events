'use client';

import { type UseFormRegister, type FieldErrors } from 'react-hook-form';
import Input from '@/components/ui/Input';
import type { FormField } from '@/types/registration';

interface DynamicFormFieldsProps {
  schema: FormField[];
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export default function DynamicFormFields({ schema, register, errors }: DynamicFormFieldsProps) {
  if (!schema || schema.length === 0) return null;

  const sortedFields = [...schema].sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="space-y-4">
      {sortedFields.map((field) => {
        const formResponseErrors = errors.formResponses as Record<string, { message?: string }> | undefined;
        const fieldError = formResponseErrors?.[field.id];
        const errorMessage = fieldError?.message;
        const fieldName = `formResponses.${field.id}`;

        switch (field.type) {
          case 'text':
          case 'email':
          case 'number':
          case 'date':
            return (
              <Input
                key={field.id}
                label={field.label}
                variant={field.type === 'number' ? 'text' : field.type === 'date' ? 'text' : field.type}
                type={field.type}
                placeholder={field.placeholder}
                error={errorMessage}
                helperText={field.helpText}
                {...register(fieldName, {
                  required: field.required ? `${field.label} is required` : false,
                })}
              />
            );

          case 'phone':
            return (
              <Input
                key={field.id}
                label={field.label}
                variant="tel"
                placeholder={field.placeholder || '+94 XX XXX XXXX'}
                error={errorMessage}
                helperText={field.helpText}
                {...register(fieldName, {
                  required: field.required ? `${field.label} is required` : false,
                })}
              />
            );

          case 'textarea':
            return (
              <Input
                key={field.id}
                label={field.label}
                variant="textarea"
                placeholder={field.placeholder}
                error={errorMessage}
                helperText={field.helpText}
                {...register(fieldName, {
                  required: field.required ? `${field.label} is required` : false,
                })}
              />
            );

          case 'select':
            return (
              <Input
                key={field.id}
                label={field.label}
                variant="select"
                error={errorMessage}
                helperText={field.helpText}
                {...register(fieldName, {
                  required: field.required ? `${field.label} is required` : false,
                })}
              >
                <option value="">Select an option</option>
                {field.options?.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Input>
            );

          case 'radio':
            return (
              <div key={field.id} className="w-full">
                <label className="mb-2 block font-ui text-sm font-medium text-(--text-secondary)">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                <div className="space-y-2">
                  {field.options?.map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        value={opt}
                        className="w-4 h-4 accent-(--color-crimson)"
                        {...register(fieldName, {
                          required: field.required ? `${field.label} is required` : false,
                        })}
                      />
                      <span className="font-body text-sm text-(--text-secondary) group-hover:text-(--text-primary) transition-colors">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
                {errorMessage && (
                  <p className="mt-1.5 font-body text-xs text-red-500" role="alert">
                    {errorMessage}
                  </p>
                )}
                {field.helpText && !errorMessage && (
                  <p className="mt-1.5 font-body text-xs text-(--text-muted)">
                    {field.helpText}
                  </p>
                )}
              </div>
            );

          case 'checkbox':
            return (
              <div key={field.id} className="w-full">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-0.5 accent-(--color-crimson) rounded"
                    {...register(fieldName, {
                      required: field.required ? `${field.label} is required` : false,
                    })}
                  />
                  <div>
                    <span className="font-body text-sm text-(--text-secondary) group-hover:text-(--text-primary) transition-colors">
                      {field.label}
                    </span>
                    {field.helpText && (
                      <p className="font-body text-xs text-(--text-muted) mt-0.5">
                        {field.helpText}
                      </p>
                    )}
                  </div>
                </label>
                {errorMessage && (
                  <p className="mt-1.5 ml-7 font-body text-xs text-red-500" role="alert">
                    {errorMessage}
                  </p>
                )}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
