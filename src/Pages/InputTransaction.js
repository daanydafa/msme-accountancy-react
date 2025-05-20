import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import { createTransaction } from '../Services/Api';
import FormInput from '../Components/FormInput';
import FormLayout from '../Layouts/FormLayout';
import Loading from '../Components/Loading';

const InputTransaction = () => {
    const [formFields, setFormFields] = useState([]);
    const [selectedType, setSelectedType] = useState('expense');
    const [selectedDetailedType, setSelectedDetailedType] = useState('operational');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    const getDetailedTypeOptions = (type) => {
        return type === 'income'
            ? [
                { value: 'lunas', label: 'Lunas' },
                { value: 'dp', label: 'Down Payment' }
            ]
            : [
                { value: 'production', label: 'Produksi' },
                { value: 'operational', label: 'Operasional' }
            ];
    };

    const getCategoryOptions = (type, detailedType) => {
        if (type === 'expense' && detailedType === 'operational') {
            return [
                { value: 'transport', label: 'Transport' },
                { value: 'legal', label: 'Legal' },
                { value: 'packaging', label: 'Packaging' }
            ];
        }
        return null;
    };

    useEffect(() => {
        const dynamicFields = [
            {
                name: 'type',
                label: 'Tipe Transaksi',
                type: 'select',
                options: [
                    { value: 'expense', label: 'Uang Keluar' },
                    { value: 'income', label: 'Uang Masuk' }
                ]
            },
            {
                name: 'detailed_type',
                label: 'Tipe Detail',
                type: 'select',
                options: getDetailedTypeOptions(selectedType)
            },
            { name: 'amount', label: 'Jumlah', type: 'number' },
            ...(selectedType === 'expense' && selectedDetailedType === 'operational'
                ? [{
                    name: 'category',
                    label: 'Kategori',
                    type: 'select',
                    options: getCategoryOptions(selectedType, selectedDetailedType)
                }]
                : []
            ),
            { name: 'date', label: 'Tanggal', type: 'date' },
            { name: 'description', label: 'Keterangan Transaksi', type: 'text' },
        ];
        setFormFields(dynamicFields);
    }, [selectedType, selectedDetailedType]);

    const validator = (values) => {
        const errors = {};
        if (!values.type) errors.type = 'Tipe transaksi wajib dipilih';
        if (!values.detailed_type) errors.detailed_type = 'Tipe detail wajib dipilih';
        if (!values.amount) errors.amount = 'Jumlah wajib diisi';
        if (values.type === 'expense' &&
            values.detailed_type === 'operational' &&
            !values.category) {
            errors.category = 'Kategori wajib dipilih';
        }
        if (!values.date) errors.date = 'Tanggal wajib diisi';
        if (!values.description) errors.description = 'Keterangan wajib diisi';
        return errors;
    };

    const handleSubmit = async (data) => {
        data.order_id = id;

        if (data.type !== 'expense' || data.detailed_type !== 'operational') {
            delete data.category;
        }

        setErrors({});
        setIsLoading(true);
        
        try {
            await createTransaction(data);
            navigate(-1);
            setTimeout(() => {
                navigate(`/orders/${id}`);
            }, 100);
        } catch (error) {
            setErrors({ general: error });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <FormLayout>
            <FormInput
                context='transaction'
                fields={formFields}
                onSubmit={handleSubmit}
                validator={validator}
                onTypeChange={setSelectedType}
                onDetailedTypeChange={setSelectedDetailedType}
            />
        </FormLayout>
    );
};

export default InputTransaction;