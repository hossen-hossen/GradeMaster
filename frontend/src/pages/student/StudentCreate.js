/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Form, Label, Card, CardBody, Button } from "reactstrap";
import classnames from 'classnames';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../../components/FullScreenLoader";
import { useCreateStudentMutation } from "../../redux/api/studentAPI";

const StudentCreate = () => {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [createStudent, { isLoading, isError, error, isSuccess, data }] = useCreateStudentMutation();

    const onSubmit = (data) => {
        createStudent(data);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
            navigate("/students");
        }

        if (isError) {
            const errorMsg = error?.data?.message || error?.data || 'Error occurred';
            toast.error(errorMsg, {
                position: 'top-right',
            });
        }
    }, [isLoading]);

    return (
        <>
            {isLoading ? (<FullScreenLoader />) : (
                <div className="student-container">
                    <Row className="justify-content-center mt-5">
                        <Col md={8}>
                            <Card className="shadow-lg student-card">
                                <CardBody className="p-4">
                                    <h2 className="text-center mb-4">Create Student</h2>
                                    <Form onSubmit={handleSubmit(onSubmit)} className="student-form">
                                        <Row>
                                            <Col md="6">
                                                <div className='form-group mb-4'>
                                                    <Label className="form-label" for="name">Student Name</Label>
                                                    <input
                                                        className={`form-control ${classnames({ 'is-invalid': errors.name })}`}
                                                        type="text"
                                                        id="name"
                                                        {...register('name', { required: true })}
                                                        placeholder="Enter student's name"
                                                    />
                                                    {errors.name && <div className="invalid-feedback">Student Name is required.</div>}
                                                </div>
                                            </Col>

                                            <Col md="6">
                                                <div className='form-group mb-4'>
                                                    <Label className="form-label" for="email">Email</Label>
                                                    <input
                                                        className={`form-control ${classnames({ 'is-invalid': errors.email })}`}
                                                        type="email"
                                                        id="email"
                                                        {...register('email', { required: true })}
                                                        placeholder="Enter email"
                                                    />
                                                    {errors.email && <div className="invalid-feedback">Email is required.</div>}
                                                </div>
                                            </Col>

                                            <Col md="6">
                                                <div className='form-group mb-4'>
                                                    <Label className="form-label" for="phone">Phone</Label>
                                                    <input
                                                        className={`form-control ${classnames({ 'is-invalid': errors.phone })}`}
                                                        type="text"
                                                        id="phone"
                                                        {...register('phone', { required: true })}
                                                        placeholder="Enter phone number"
                                                    />
                                                    {errors.phone && <div className="invalid-feedback">Phone is required.</div>}
                                                </div>
                                            </Col>

                                            <Col md="6">
                                                <div className='form-group mb-4'>
                                                    <Label className="form-label" for="gender">Gender</Label>
                                                    <select
                                                        className={`form-select ${classnames({ 'is-invalid': errors.gender })}`}
                                                        id="gender"
                                                        {...register('gender', { required: true })}
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="Male">Male</option>
                                                        <option value="Female">Female</option>
                                                        <option value="Other">Other</option>
                                                    </select>
                                                    {errors.gender && <div className="invalid-feedback">Gender is required.</div>}
                                                </div>
                                            </Col>

                                            <Col md="6">
                                                <div className='form-group mb-4'>
                                                    <Label className="form-label" for="date_of_birth">Date of Birth</Label>
                                                    <input
                                                        className={`form-control ${classnames({ 'is-invalid': errors.date_of_birth })}`}
                                                        type="date"
                                                        id="date_of_birth"
                                                        {...register('date_of_birth', { required: true })}
                                                    />
                                                    {errors.date_of_birth && <div className="invalid-feedback">Date of Birth is required.</div>}
                                                </div>
                                            </Col>

                                            <Col md="6">
                                                <div className='form-group mb-4'>
                                                    <Label className="form-label" for="address">Address</Label>
                                                    <input
                                                        className={`form-control ${classnames({ 'is-invalid': errors.address })}`}
                                                        id="address"
                                                        {...register('address', { required: true })}
                                                        placeholder="Enter address"
                                                    />
                                                    {errors.address && <div className="invalid-feedback">Address is required.</div>}
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="d-grid mt-4">
                                            <Button color="primary" className="submit-button" type="submit">
                                                Submit Student
                                            </Button>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
};

export default StudentCreate;
