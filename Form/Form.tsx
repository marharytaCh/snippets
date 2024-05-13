import React from 'react';
import useForm from './useForm';
import InputField from './InputField';
import ToggleSwitch from './ToggleSwitch';
import Button from '../Button/Button';
import './style.scss';

const Form: React.FC = () => {
    const form = useForm({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            phoneNumbers: [''],
            agreeToTerms: false,
        },
        validate: (values) => {
            const errors: { [key: string]: string[] } = {};
            if (!values.firstName) errors.firstName = ['First name is required'];
            if (!values.lastName) errors.lastName = ['Last name is required'];
            if (!values.email) errors.email = ['Email is required'];
            if (!values.password) errors.password = ['Password is required'];
            if (values.phoneNumbers.some((num: string) => !num)) errors.phoneNumbers = ['All phone numbers must be filled'];
            if (!values.agreeToTerms) errors.agreeToTerms = ['You must agree to the terms'];
            return errors;
        },
    });

    return (
        <form onSubmit={form.handleSubmit}>
            <InputField label="First Name" type="text" value={form.values.firstName} onChange={(value) => form.handleChange('firstName', value)} />
            <InputField label="Last Name" type="text" value={form.values.lastName} onChange={(value) => form.handleChange('lastName', value)} />
            <InputField label="Email" type="email" value={form.values.email} onChange={(value) => form.handleChange('email', value)} />
            <InputField label="Password" type="password" value={form.values.password} onChange={(value) => form.handleChange('password', value)} />
            {form.values.phoneNumbers.map((number: string, index: number) => (
                <div key={index}>
                    <InputField label={`Phone Number ${index + 1}`} type="tel" value={number} onChange={(value) => form.handleChange('phoneNumbers', value, index)} />
                    {index > 0 && (
                        <Button onClick={() => form.handleRemoveField('phoneNumbers', index)}>Remove</Button>
                    )}
                </div>
            ))}
            <Button onClick={() => form.handleAddField('phoneNumbers', '')}>Add Phone Number</Button>
            <ToggleSwitch label="Agree to Terms" isOn={form.values.agreeToTerms} onToggle={() => form.handleChange('agreeToTerms', !form.values.agreeToTerms)} />
            <Button type="submit">Register</Button>
        </form>
    );
};

export default Form;