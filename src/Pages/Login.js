import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextInput from '../Components/TextInput';
import InputLabel from '../Components/InputLabel';
import InputError from '../Components/InputEror';
import PrimaryButton from '../Components/PrimaryButton';
import LoginLayout from '../Layouts/LoginLayout';
import { useAuth } from '../Contexts/AuthContext';

export default function Login() {
    const [data, setData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        return () => setData({ ...data, password: '' });
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        try {
            await login(data);
            navigate('/');
        } catch (error) {
            setErrors({ general: error.message });
        } 
    };

    return (
        <LoginLayout>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        autoComplete="username"
                        onChange={handleChange}
                        isFocused={true}
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="mt-4 space-y-2">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        value={data.password}
                        onChange={handleChange}
                    />
                    <InputError message={errors.password} />
                </div>

                {errors.general && (
                    <div className="mt-4 text-red-500">{errors.general}</div>
                )}

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton disabled={processing}>Log in</PrimaryButton>
                </div>
            </form>
        </LoginLayout>
    );
}
