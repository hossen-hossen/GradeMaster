/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import logoImg from '../../assets/img/logo.png';
import { useRegisterUserMutation } from '../../redux/api/authAPI';
import { useEffect, useState } from 'react';
import { isObjEmpty } from '../../utils/Utils';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm();

    const [addressObj, setAddressObj] = useState();

    const [registerUser, { isLoading, isSuccess, error, isError, data }] = useRegisterUserMutation();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (!addressObj) {
            setError('address', {
                type: 'manual',
                message: 'Please select an address using the suggested option'
            });
        }
        if (isObjEmpty(errors)) {
            data.address = addressObj;
            data.role = 'client';
            registerUser(data);
        }
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
            navigate('/login');
        }

        if (isError) {
            const errorMessage = typeof error?.data === 'string' ? error.data : error?.data?.message;
            toast.error(errorMessage || 'An unknown error occurred', {
                position: 'top-right',
            });
            console.error('Error:', errorMessage);
        }
    }, [isLoading]);

    return (
        <div className="container-xxl">
            <div className="row vh-100 d-flex justify-content-center">
                <div className="col-12 align-self-center">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-4 mx-auto">
                                <div className="card">
                                    <div className="card-body p-0 bg-black auth-header-box rounded-top">
                                        <div className="text-center p-3">
                                            <img src={logoImg} height="50" alt="register" className="auth-logo" />
                                            <h4 className="mt-3 mb-1 fw-semibold text-white fs-18">Create an Account</h4>
                                            <p className="fw-medium mb-0 text-white">Register to continue.</p>
                                        </div>
                                    </div>
                                    <div className="card-body pt-0">
                                        <Form onSubmit={handleSubmit(onSubmit)} className="my-4">
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="username">Username</label>
                                                <input
                                                    className={`form-control ${classnames({ 'is-invalid': errors.username })}`}
                                                    type="text"
                                                    id="username"
                                                    placeholder='Enter username'
                                                    {...register('username', { required: true })}
                                                />
                                                {errors.username && <span className="text-danger"><small>Username is required.</small></span>}
                                            </div>

                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <input
                                                    className={`form-control ${classnames({ 'is-invalid': errors.email })}`}
                                                    type="email"
                                                    id="email"
                                                    placeholder='Enter email'
                                                    {...register('email', { required: true })}
                                                />
                                                {errors.email && <span className="text-danger"><small>Email is required.</small></span>}
                                            </div>

                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="phone">Phone</label>
                                                <input
                                                    className={`form-control ${classnames({ 'is-invalid': errors.phone })}`}
                                                    type="text"
                                                    id="phone"
                                                    placeholder='Enter phone'
                                                    {...register('phone', {
                                                        required: 'Phone is required.',
                                                        pattern: {
                                                            value: /^[0-9]{10}$/,
                                                            message: 'Phone number must be 10 digits.'
                                                        }
                                                    })}
                                                />
                                                {errors.phone && <span className="text-danger"><small>{errors.phone.message}</small></span>}
                                            </div>

                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="gender">Gender</label>
                                                <select
                                                    className={`form-control ${classnames({ 'is-invalid': errors.gender })}`}
                                                    id="gender"
                                                    {...register('gender', { required: true })}
                                                >
                                                    <option value="">Select Gender</option>
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                                {errors.gender && <span className="text-danger"><small>Gender is required.</small></span>}
                                            </div>

                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="address">Address</label>
                                                <Autocomplete
                                                    className={`form-control ${classnames({ 'is-invalid': errors.address })}`}
                                                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                                    onPlaceSelected={(place) => {
                                                        clearErrors('address');
                                                        setAddressObj(place);
                                                    }}
                                                    options={{
                                                        types: ['address'],
                                                    }}
                                                />
                                                {errors.address && <span className="text-danger"><small>{errors.address.message}</small></span>}
                                            </div>

                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="password">Password</label>
                                                <input
                                                    className={`form-control ${classnames({ 'is-invalid': errors.password })}`}
                                                    type="password"
                                                    id="password"
                                                    placeholder='Enter password'
                                                    {...register('password', { required: true })}
                                                />
                                                {errors.password && <span className="text-danger"><small>Password is required.</small></span>}
                                            </div>

                                            <div className="form-group mb-0 row">
                                                <div className="col-12">
                                                    <div className="d-grid mt-3">
                                                        <Button color="outline-dark" className="btn-block w-100" type="submit">
                                                            Register
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>

                                        <div className="mt-4 text-center">
                                            <p>Already have an account?{' '}
                                                <span>
                                                    <Link to="/login" className="primary-link">
                                                        <span>Log In</span>
                                                    </Link>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
