/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Label, Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Autocomplete from 'react-google-autocomplete';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import registerImg from '../../assets/img/register.png';
import { useRegisterUserMutation } from '../../redux/api/authAPI';
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

    // 👇 Calling the Register Mutation
    const [registerUser, { isLoading, isSuccess, error, isError, data }] = useRegisterUserMutation();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (!addressObj) {
            errors.address = {};
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
        <div className="auth-wrapper auth-cover">
            <div className="auth-inner row m-0">
                <div className="d-none d-lg-flex col-lg-8 align-items-center p-5">
                    <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
                        <img className="img-fluid" src={registerImg} alt="Register" />
                    </div>
                </div>
                <div className="d-flex col-lg-4 align-items-center auth-bg px-2 p-lg-5">
                    <div className="col-12 col-sm-8 col-md-6 col-lg-12 px-xl-2 mx-auto">
                        <h2 className="fw-bold mb-3" style={{ fontSize: '28px' }}>Register</h2>
                        <div className="row">
                            <div className="col-12">
                                <h1 className="heading-4 form-title">Please Create an Account</h1>
                                <p className="body-2 md-vertical-spacing">
                                    Already have an account?{' '}
                                    <a href="/login" className="primary-link">
                                        <span>&nbsp;Log In</span>
                                    </a>
                                </p>
                            </div>
                        </div>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-2'>
                                <Label>Username</Label>
                                <input
                                    className={`form-control ${classnames({ 'is-invalid': errors.username })}`}
                                    type="text"
                                    id="username"
                                    {...register('username', { required: true })}
                                />
                                {errors.username && <span className="text-danger"><small>Username is required.</small></span>}
                            </div>
                            <div className='mb-2'>
                                <Label>Email</Label>
                                <input
                                    className={`form-control ${classnames({ 'is-invalid': errors.email })}`}
                                    type="email"
                                    id="email"
                                    {...register('email', { required: true })}
                                />
                                {errors.email && <span className="text-danger"><small>Email is required.</small></span>}
                            </div>
                            <div className='mb-2'>
                                <Label>Phone</Label>
                                <input
                                    className={`form-control ${classnames({ 'is-invalid': errors.phone })}`}
                                    type="text"
                                    id="phone"
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
                            <div className='mb-2'>
                                <Label>Gender</Label>
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
                            <div className='mb-2'>
                                <Label>Address</Label>
                                <Autocomplete
                                    className="form-control"
                                    apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                                    onChange={(e) => setAddressObj()}
                                    onPlaceSelected={(place) => {
                                        clearErrors('address');
                                        setAddressObj(place);
                                    }}
                                    options={{
                                        types: ['address']
                                    }}
                                />
                                {Object.keys(errors).length && errors.address ? <small className="small text-danger mt-1">{errors.address.message}</small> : null}
                            </div>
                            <div className='mb-2'>
                                <Label>Password</Label>
                                <input
                                    className={`form-control ${classnames({ 'is-invalid': errors.password })}`}
                                    type="password"
                                    id="password"
                                    {...register('password', { required: true })}
                                />
                                {errors.password && <span className="text-danger"><small>Password is required.</small></span>}
                            </div>

                            <div className="mt-4">
                                <Button color="outline-secondary" className="btn-block w-100" type="submit">
                                    Register
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;
