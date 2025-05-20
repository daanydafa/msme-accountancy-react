import { useState, useEffect } from 'react';

const FormInput = ({ fields, dynamicFields = [], onSubmit, initialData = {}, validator, context, onTypeChange, onDetailedTypeChange }) => {
    const [values, setValues] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [dynamicValues, setDynamicValues] = useState([{}]);
    const [conditionalFields, setConditionalFields] = useState([]);

    useEffect(() => {
        if (onTypeChange && values.type) {
            onTypeChange(values.type);
        }
        if (onDetailedTypeChange && values.detailed_type) {
            onDetailedTypeChange(values.detailed_type);
        }
    }, [values.type, values.detailed_type, onTypeChange, onDetailedTypeChange]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValues = { ...values, [name]: value };

        setValues(newValues);

        if (name === 'type' && onTypeChange) {
            onTypeChange(value);
        }
        if (name === 'detailed_type' && onDetailedTypeChange) {
            onDetailedTypeChange(value);
        }

        if (validator) {
            const validationErrors = validator(newValues, dynamicValues);
            setErrors(validationErrors);
        }
    };

    const handleDynamicFieldChange = (index, e) => {
        const { name, value } = e.target;
        const newDynamicValues = [...dynamicValues];
        newDynamicValues[index] = {
            ...newDynamicValues[index],
            [name]: value
        };
        setDynamicValues(newDynamicValues);

        if (validator) {
            const validationErrors = validator(values, newDynamicValues);
            setErrors(validationErrors);
        }
    };

    const addDynamicField = () => {
        setDynamicValues([...dynamicValues, {}]);
    };

    const removeDynamicField = (indexToRemove) => {
        setDynamicValues(dynamicValues.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validator
            ? validator(values, dynamicValues)
            : {};

        if (Object.keys(validationErrors).length === 0) {
            onSubmit({
                ...values,
                ...(dynamicValues.length > 0 && { items: dynamicValues })
            });
        } else {
            setErrors(validationErrors);
        }
    };

    const renderField = (field) => {
        if (field.options) {
            return (
                <select
                    name={field.name}
                    value={values[field.name] || ''}
                    onChange={handleChange}
                    className="w-full p-4 border rounded-xl text-lg"
                >
                    <option value="">Pilih {field.label}</option>
                    {field.options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        }

        return (
            <input
                type={field.type}
                name={field.name}
                value={values[field.name] || ''}
                onChange={handleChange}
                className="w-full p-4 border rounded-xl text-lg"
            />
        );
    };

    const renderDynamicFields = () => {
        return dynamicValues.map((dynamicValue, index) => (
            <div key={index} className="flex space-x-2 mb-2 items-center">
                {dynamicFields.map(field => (
                    <div key={field.name} className="flex-grow">
                        <label className="block mb-2 uppercase">{field.label}</label>
                        <input
                            type={field.type}
                            name={field.name}
                            value={dynamicValue[field.name] || ''}
                            onChange={(e) => handleDynamicFieldChange(index, e)}
                            className="w-full p-4 border rounded-xl text-lg"
                            required
                        />
                    </div>
                ))}
                {dynamicValues.length > 1 && (
                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={() => removeDynamicField(index)}
                            className="text-red-500 hover:text-red-700 mt-6"
                        >
                            🗑️
                        </button>
                    </div>
                )}
            </div>
        ));
    };

    return (
        <form onSubmit={handleSubmit} >
            <div className="space-y-8 p-8">
                {fields.map((field) => (
                    <div key={field.name}>
                        <label className="block mb-2 tracking-wider uppercase text-xl">{field.label}</label>
                        {renderField(field)}
                        {errors[field.name] && (
                            <span className="text-red-500 text-sm">
                                {errors[field.name]}
                            </span>
                        )}
                    </div>
                ))}

                {dynamicFields.length > 0 && (
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl uppercase  tracking-wider font-semibold">
                                {context === 'transaction' ? 'Daftar Item' : 'Tambah Item'}
                            </h3>
                            <button
                                type="button"
                                onClick={addDynamicField}
                                className="text-green-600 hover:text-green-800"
                            >
                                + Tambah Item
                            </button>
                        </div>
                        {renderDynamicFields()}
                    </div>
                )}
            </div>
            <div className='flex justify-center items-center w-full fixed bottom-0 h-36 bg-white p-4 rounded-xl border-t-2'>
                <div className="flex space-x-2 w-2/3">
                    <button
                        type="submit"
                        className="bg-gray-900  text-2xl text-white py-2 rounded-xl flex-grow"
                    >
                        Simpan
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            setValues(initialData);
                            setDynamicValues([]);
                        }}
                        className="bg-gray-100 text-2xl text-gray-800 px-4 py-2 border rounded-xl"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </form>
    );
};

export default FormInput;