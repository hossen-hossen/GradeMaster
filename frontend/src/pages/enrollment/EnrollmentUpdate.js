/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Form, Label, Card, CardBody, Button } from "reactstrap";
import classnames from 'classnames';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from "react-router-dom";
import { useGetCoursesQuery } from "../../redux/api/courseAPI";
import FullScreenLoader from "../../components/FullScreenLoader";
import { useGetStudentsQuery } from "../../redux/api/studentAPI";
import { useGetEnrollmentByIdQuery, useUpdateEnrollmentMutation } from "../../redux/api/enrollmentAPI";

const EnrollmentUpdate = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Retrieve the enrollment ID from the URL params
    const {
        register,
        handleSubmit,
        watch,
        setValue, // This is used to set the form default values
        formState: { errors }
    } = useForm();
    const { data: students, isLoading: studentsLoading } = useGetStudentsQuery();
    const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery();
    const { data: enrollment, refetch, isLoading: enrollmentLoading } = useGetEnrollmentByIdQuery(id);
    const [updateEnrollment, { isLoading, isError, error, isSuccess, data }] = useUpdateEnrollmentMutation();

    useEffect(() => {
        if (enrollment) {
            setValue('course_id', enrollment.course_id);
            setValue('student_ids', enrollment.students.map((student) => student.student_id));
        }
    }, [enrollment]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const onSubmit = (formData) => {
        const enrollmentData = {
            course_id: formData.course_id,
            student_ids: formData.student_ids
        };
        updateEnrollment({ id, enrollment: enrollmentData });
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Enrollment updated successfully");
            navigate("/enrollments");
        }

        if (isError) {
            const errorMsg = error?.data?.message || error?.data || "Error updating enrollment";
            toast.error(errorMsg, {
                position: 'top-right',
            });
        }
    }, [isLoading]);

    return (
        <>
            {isLoading || studentsLoading || coursesLoading || enrollmentLoading ? (
                <FullScreenLoader />
            ) : (
                <div className="enrollment-container">
                    <Row className="justify-content-center mt-5">
                        <Col md={12}>
                            <Card className="shadow-lg enrollment-card">
                                <CardBody className="p-5">
                                    <h2 className="text-center mb-4">Update Enrollment</h2>
                                    <Form onSubmit={handleSubmit(onSubmit)} className="enrollment-form">
                                        <Row>
                                            <Col md="6">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="course_id">Course</Label>
                                                    <select
                                                        className={`form-select ${classnames({
                                                            'is-invalid': errors.course_id,
                                                        })}`}
                                                        {...register('course_id', { required: true })}
                                                        disabled
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
                                                        <div className="invalid-feedback">Course is required.</div>
                                                    )}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="student_ids">Students</Label>
                                                    <select
                                                        multiple
                                                        className={`form-select ${classnames({
                                                            'is-invalid': errors.student_ids,
                                                        })}`}
                                                        {...register('student_ids', { required: true })}
                                                        value={watch('student_ids')}
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
                                                        <div className="invalid-feedback">At least one student is required.</div>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="d-grid mt-4">
                                            <Button color="primary" type="submit" className="submit-button">
                                                Update Enrollment
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

export default EnrollmentUpdate;
