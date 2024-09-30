/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Row, Card, CardBody, Form, Label } from 'reactstrap';
import classnames from 'classnames';
import { useUpdateGradeWeightMutation, useGetGradeWeightQuery } from '../../redux/api/gradeWeightAPI';
import { useGetCoursesQuery } from '../../redux/api/courseAPI'; 
import FullScreenLoader from '../../components/FullScreenLoader';
import { toast } from 'react-toastify';

const GradeWeightUpdate = () => {
    const { id } = useParams();
    const { data: gradeWeight, isLoading: gradeWeightLoading } = useGetGradeWeightQuery(id);
    const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery();  
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [updateGradeWeight, { isLoading, isSuccess, isError, error, data }] = useUpdateGradeWeightMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (gradeWeight) {
            const fields = ['course_id', 'item_type', 'weight'];
            fields.forEach((field) => setValue(field, gradeWeight[field]));
        }
    }, [gradeWeight]);

    const onSubmit = (data) => {
        updateGradeWeight({ id, gradeWeight: data });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || 'Grade Weight updated successfully');
            navigate('/gradeWeights');
        }

        if (isError) {
            const errorMsg = error?.data?.message || error?.data || 'Error occurred';
            toast.error(errorMsg);
        }
    }, [isLoading]);

    return (
        <>
            {isLoading || gradeWeightLoading || coursesLoading ? <FullScreenLoader /> : (
                <div className="grade-weight-container">
                    <Row className="justify-content-center mt-5">
                        <Col md={12}>
                            <Card className="shadow-lg grade-weight-card">
                                <CardBody className="p-5">
                                    <h2 className="text-center mb-4">Update Grade Weight</h2>
                                    <Form onSubmit={handleSubmit(onSubmit)} className="grade-weight-form">
                                        <Row>
                                            <Col md="6">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="course_id">Course</Label>
                                                    <select
                                                        className={classnames('form-select', { 'is-invalid': errors.course_id })}
                                                        {...register('course_id', { required: true })}
                                                    >
                                                        <option value="">Select Course</option>
                                                        {courses && courses.map(course => (
                                                            <option key={course.id} value={course.id}>
                                                                {course.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    {errors.course_id && <div className="invalid-feedback">Course is required.</div>}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="item_type">Item Type</Label>
                                                    <select
                                                        className={classnames('form-select', { 'is-invalid': errors.item_type })}
                                                        {...register('item_type', { required: true })}
                                                    >
                                                        <option value="Assignment">Assignment</option>
                                                        <option value="Exam">Exam</option>
                                                        <option value="Attendance">Attendance</option>
                                                    </select>
                                                    {errors.item_type && <div className="invalid-feedback">Item type is required.</div>}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="weight">Weight</Label>
                                                    <input
                                                        className={classnames('form-control', { 'is-invalid': errors.weight })}
                                                        type="number"
                                                        {...register('weight', { required: true })}
                                                        placeholder="Enter weight"
                                                    />
                                                    {errors.weight && <div className="invalid-feedback">Weight is required.</div>}
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="d-grid mt-4">
                                            <Button color="primary" className="submit-button" type="submit">Submit</Button>
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

export default GradeWeightUpdate;
