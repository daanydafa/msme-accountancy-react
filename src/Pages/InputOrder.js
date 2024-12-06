import { useNavigate } from 'react-router-dom';
import { createOrder } from '../Services/Api';
import FormInput from '../Components/FormInput';
import FormLayout from '../Layouts/FormLayout';
import Loading from '../Components/Loading';
import { useState } from 'react';

const InputOrder = () => {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const staticFields = [
        { name: 'customer_name', label: 'Nama Pelanggan', type: 'text' },
        { name: 'customer_phone', label: 'Nomor Telepon', type: 'tel' },
        { name: 'completion_date', label: 'Tanggal Selesai', type: 'date' }
    ];

    const dynamicItemFields = [
        { name: 'item_name', label: 'Nama Item', type: 'text' },
        { name: 'quantity', label: 'Kuantitas', type: 'number' },
        { name: 'items_price', label: 'Harga Item', type: 'number' }
    ];

    const validator = (values, items) => {
        const errors = {};

        if (!values.customer_name) errors.customer_name = 'Nama pelanggan wajib diisi';
        if (!values.customer_phone) errors.customer_phone = 'Nomor telepon wajib diisi';
        if (!values.completion_date) errors.completion_date = 'Tanggal selesai wajib diisi';

        if (!items || items.length === 0) {
            errors.items = 'Minimal satu item harus ditambahkan';
        } else {
            items.forEach((item, index) => {
                if (!item.item_name) errors[`item_${index}_name`] = 'Nama item wajib diisi';
                if (!item.quantity) errors[`item_${index}_quantity`] = 'Kuantitas wajib diisi';
                if (!item.items_price) errors[`item_${index}_price`] = 'Harga item wajib diisi';
            });
        }

        return errors;
    };

    const handleSubmit = async (data) => {
        data.completion_date = Math.floor(new Date(data.completion_date).getTime() / 1000);
        setErrors({});
        try {
            setIsLoading(true);
            const response = await createOrder(data);
            console.log(response);
            navigate(-1);
            setTimeout(() => {
                navigate(`/orders/${response.id}`);
            }, 100);
        } catch (error) {
            setErrors({ general: error });
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <Loading />
    }
    return (
        <FormLayout>
            <FormInput
                context='order'
                fields={staticFields}
                dynamicFields={dynamicItemFields}
                onSubmit={handleSubmit}
                validator={validator}
            />
        </FormLayout>
    );
};

export default InputOrder;