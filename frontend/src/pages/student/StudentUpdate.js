/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Form, Label, Card, CardBody, Button } from "reactstrap";
import classnames from 'classnames';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import FullScreenLoader from "../../components/FullScreenLoader";
import { useGetStudentQuery, useUpdateStudentMutation } from "../../redux/api/studentAPI";

const StudentUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: student, refetch } = useGetStudentQuery(id);

    const {
        register,
        handleSubmit,
        setValue, // Use to populate the form
        formState: { errors }
    } = useForm({
        defaultValues: {
            courseIds: []  // Initialize with an empty array for multiple select
        }
    });

    // Fetch student data and populate form
    useEffect(() => {
        refetch();
    }, [refetch]);

    const [updateStudent, { isLoading, isError, error, isSuccess, data }] = useUpdateStudentMutation();

    // Populate form with student data and selected courses
    useEffect(() => {
        if (student) {
            const fields = ['name', 'email', 'phone', 'gender', 'date_of_birth', 'address'];
            fields.forEach((field) => setValue(field, student[field]));

            // Set courseIds as an array of selected course IDs
            const selectedCourseIds = student.courses ? student.courses.map(course => course.id) : [];
            setValue('courseIds', selectedCourseIds);
        }
    }, [student, setValue]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || 'Student updated successfully');
            navigate("/students");
        }

        if (isError) {
            const errorMsg = error?.data?.message || error?.data || 'Error occurred';
            toast.error(errorMsg, {
                position: 'top-right',
            });
        }
    }, [isSuccess, isError, isLoading]);

    const onSubmit = (formData) => {
        updateStudent({ id, student: formData });
    };

    return (
        <>
            {isLoading ? (
                <FullScreenLoader />
            ) : (
                <div className="student-container">
                    <Row className="justify-content-center mt-5">
                        <Col md={8}>
                            <Card className="shadow-lg student-card">
                                <CardBody className="p-5">
                                    <h2 className="text-center mb-4">Update Student</h2>
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
                                                Update Student
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

export default StudentUpdate;
