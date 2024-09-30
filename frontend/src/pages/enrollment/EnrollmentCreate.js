/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Form, Label, Card, CardBody, Button } from "reactstrap";
import classnames from 'classnames';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useGetCoursesQuery } from "../../redux/api/courseAPI";
import FullScreenLoader from "../../components/FullScreenLoader";
import { useGetStudentsQuery } from "../../redux/api/studentAPI";
import { useCreateEnrollmentMutation } from "../../redux/api/enrollmentAPI";

const EnrollmentCreate = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { data: students, isLoading: studentsLoading } = useGetStudentsQuery();
    const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery();
    const [createEnrollment, { isLoading, isError, error, isSuccess, data }] = useCreateEnrollmentMutation();

    const onSubmit = (formData) => {
        // Submit enrollment data with multiple students
        const enrollmentData = {
            course_id: formData.course_id,
            student_ids: formData.student_ids
        };
        createEnrollment(enrollmentData);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
            navigate("/enrollments");
        }

        if (isError) {
            const errorMsg = error?.data?.message || error?.data;
            toast.error(errorMsg, {
                position: 'top-right',
            });
        }
    }, [isLoading]);

    return (
        <>
            {isLoading || studentsLoading || coursesLoading ? (<FullScreenLoader />) : (
                <div className="container main-content">
                    <Row className="my-3">
                        <Col>
                            <h4 className="main-title">Create Enrollment</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card>
                                <CardBody>
                                    <Form onSubmit={handleSubmit(onSubmit)}>
                                        <Row>
                                            <Col md="6">
                                                <div className='mb-2'>
                                                    <Label>Course</Label>
                                                    <select
                                                        className={`form-control ${classnames({
                                                            'is-invalid': errors.course_id,
                                                        })}`}
                                                        {...register('course_id', { required: true })}
                                                    >
                                                        <option value="">Select Course</option>
                                                        {courses &&
                                                            courses.map((course) => (
                                                                <option key={course.id} value={course.id}>
                                                                    {course.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                    {errors.course_id && (
                                                        <small className="text-danger">Course is required.</small>
                                                    )}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="mb-2">
                                                    <Label>Students</Label>
                                                    <select
                                                        multiple  // Enable multiple selections
                                                        className={`form-control ${classnames({
                                                            'is-invalid': errors.student_ids,
                                                        })}`}
                                                        {...register('student_ids', { required: true })}
                                                    >
                                                        <option value="" disabled>Select Students</option>
                                                        {students &&
                                                            students.map((student) => (
                                                                <option key={student.id} value={student.id}>
                                                                    {student.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                    {errors.student_ids && (
                                                        <small className="text-danger">At least one student is required.</small>
                                                    )}
                                                </div>
                                            </Col>
                                        
                                        </Row>

                                        <div className="mt-4">
                                            <Button color="outline-primary" className="btn-block" type="submit">
                                                Submit Enrollment
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

export default EnrollmentCreate;
