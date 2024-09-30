/* eslint-disable react-hooks/exhaustive-deps */
import { Form, Button } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import logoImg from '../../assets/img/logo.png';
import { toast } from 'react-toastify';
import { useLoginUserMutation } from '../../redux/api/authAPI';
import { useEffect } from 'react';

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loginUser, { isLoading, isError, error, isSuccess, data }] = useLoginUserMutation();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        loginUser(data);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
            navigate('/courses');
        }

        if (isError) {
            if (isSuccess && data?.message) {
                toast.success(data.message);
            } else if (isError && error?.data) {
                const errorMessage = typeof error.data === 'string' ? error.data : error.data?.message;
                toast.error(errorMessage || 'An unknown error occurred', {
                    position: 'top-right',
                });
                console.error('Error:', errorMessage);
            }
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
                                            <img src={logoImg} height="50" alt="logo" className="auth-logo" />
                                            <h4 className="mt-3 mb-1 fw-semibold text-white fs-18">Let's Get Started GradeMaster</h4>
                                            <p className="fw-medium mb-0 text-white">Sign in to continue to GradeMaster.</p>
                                        </div>
                                    </div>
                                    <div className="card-body pt-0">
                                        <Form onSubmit={handleSubmit(onSubmit)} className="my-4">
                                            <div className="form-group mb-2">
                                                <label className="form-label" htmlFor="email">Email</label>
                                                <input
                                                    className={`form-control ${classnames({ 'is-invalid': errors.email })}`}
                                                    type="email"
                                                    id="email"
                                                    placeholder='Enter a email'
                                                    {...register('email', { required: true })}
                                                />
                                                {errors.email && <span className="text-danger"><small>Email is required.</small></span>}
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label" htmlFor="userpassword">Password</label>
                                                <input
                                                    className={`form-control ${classnames({ 'is-invalid': errors.password })}`}
                                                    type="password"
                                                    id="password"
                                                    placeholder='Enter a password'
                                                    {...register('password', { required: true })}
                                                />
                                                {errors.password && <span className="text-danger"><small>Password is required.</small></span>}
                                            </div>


                                            <div className="form-group mb-0 row">
                                                <div className="col-12">
                                                    <div className="d-grid mt-3">
                                                        <Button color="outline-dark" className="btn-block w-100" type="submit">
                                                            Log In
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                        <div className="mt-4 text-center">
                                            <p>Don't have an account ? {' '}
                                                <span>
                                                    <Link to="/register" className="primary-link">
                                                        <span>Free Resister</span>
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

export default Login;
