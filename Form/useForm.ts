import { useState } from 'react';

interface FormOptions {
    initialValues: { [key: string]: any };
    validate: (values: { [key: string]: any }) => { [key: string]: string[] };
}

const useForm = ({ initialValues, validate }: FormOptions) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    const handleChange = (field: string, value: any, index?: number) => {
        if (index !== undefined && Array.isArray(values[field])) {
            const updatedList = values[field].map((item: any, idx: number) =>
                idx === index ? value : item
            );
            setValues({
                ...values,
                [field]: updatedList,
            });
        } else {
            setValues({
                ...values,
                [field]: value,
            });
        }
        if (errors[field]) {
            const newErrors = validate(values);
            setErrors(newErrors);
        }
    };

    const handleAddField = (field: string, initialValue: any) => {
        setValues({
            ...values,
            [field]: [...values[field], initialValue],
        });
    };

    const handleRemoveField = (field: string, index: number) => {
        setValues({
            ...values,
            [field]: values[field].filter((_: any, idx: number) => idx !== index),
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const newErrors = validate(values);
        setErrors(newErrors);
        if (Object.keys(newErrors).every(key => newErrors[key].length === 0)) {
            console.log('Form is valid:', values);
        }
    };

    return {
        values,
        errors,
        handleChange,
        handleAddField,
        handleRemoveField,
        handleSubmit,
    };
};

export default useForm;