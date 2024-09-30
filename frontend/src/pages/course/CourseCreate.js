/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Form, Label, Card, CardBody, Button } from "reactstrap";
import classnames from 'classnames';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useCreateCourseMutation } from "../../redux/api/courseAPI";
import FullScreenLoader from "../../components/FullScreenLoader";

const CourseCreate = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [createCourse, { isLoading, isError, error, isSuccess, data }] = useCreateCourseMutation();

    const onSubmit = (data) => {
        createCourse(data);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
            navigate("/courses");
        }

        if (isError) {
            const errorMsg = error.data && error.data.message ? error.data.message : error.data;
            toast.error(errorMsg, {
                position: 'top-right',
            });
        }
    }, [isLoading]);

    return (
        <>
            {isLoading ? (<FullScreenLoader />) : (
                <div className="course-container">
                    <Row className="justify-content-center mt-5">
                        <Col md={12}>
                            <Card className="shadow-lg course-card">
                                <CardBody className="p-5">
                                    <h2 className="text-center mb-4">Create New Course</h2>
                                    <Form onSubmit={handleSubmit(onSubmit)} className="course-form">
                                        <Row>
                                            <Col md="12">
                                                <div className='form-group mb-4'>
                                                    <Label className="form-label" for="name">Course Name</Label>
                                                    <input
                                                        className={`form-control ${classnames({ 'is-invalid': errors.name })}`}
                                                        type="text"
                                                        id="name"
                                                        {...register('name', { required: true })}
                                                        placeholder="Enter the course name"
                                                    />
                                                    {errors.name && <div className="invalid-feedback">Course Name is required.</div>}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <div className='form-group mb-4'>
                                                    <Label className="form-label" for="description">Description</Label>
                                                    <textarea
                                                        className={`form-control ${classnames({ 'is-invalid': errors.description })}`}
                                                        id="description"
                                                        rows={5}
                                                        {...register('description', { required: true })}
                                                        placeholder="Enter the course description"
                                                    ></textarea>
                                                    {errors.description && <div className="invalid-feedback">Description is required.</div>}
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="d-grid mt-4">
                                            <Button color="primary" type="submit" className="submit-button">
                                                Submit Course
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
    )
}

export default CourseCreate;
