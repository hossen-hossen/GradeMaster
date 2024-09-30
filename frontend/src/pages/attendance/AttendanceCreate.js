/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Col, Row, Form, Label, Card, CardBody, Button } from 'reactstrap';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FullScreenLoader from '../../components/FullScreenLoader';
import { useCreateAttendanceMutation } from '../../redux/api/attendanceAPI';
import { useGetStudentsQuery } from '../../redux/api/studentAPI';
import { useGetCoursesQuery } from '../../redux/api/courseAPI';

const AttendanceCreate = () => {
    const navigate = useNavigate();
    const { data: students, isLoading: studentsLoading } = useGetStudentsQuery();
    const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery();
    const [createAttendance, { isLoading, isError, error, isSuccess, data }] = useCreateAttendanceMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (formData) => {
        createAttendance(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || 'Attendance recorded successfully');
            navigate('/attendances');
        }

        if (isError) {
            const errorMsg = error?.data?.message || error?.data || 'Error occurred';
            toast.error(errorMsg);
        }
    }, [isSuccess, isError]);

    return (
        <>
            {isLoading || studentsLoading || coursesLoading ? (
                <FullScreenLoader />
            ) : (
                <div className="attendance-container">
                    <Row className="d-flex justify-content-center align-items-center vh-100">
                        <Col md={8}>
                            <Card className="attendance-card">
                                <CardBody>
                                    <h2 className="text-center mb-4">Record Attendance</h2>
                                    <Form onSubmit={handleSubmit(onSubmit)} className="attendance-form">
                                        <Row>
                                            <Col md="6">
                                                <div className="input-group mb-3">
                                                    <Label for="student_id" className="input-label">
                                                        <i className="input-icon bi bi-person"></i> Student
                                                    </Label>
                                                    <select
                                                        id="student_id"
                                                        className={`custom-select ${classnames({
                                                            'input-error': errors.student_id,
                                                        })}`}
                                                        {...register('student_id', { required: true })}
                                                    >
                                                        <option value="">Choose a Student</option>
                                                        {students &&
                                                            students.map((student) => (
                                                                <option key={student.id} value={student.id}>
                                                                    {student.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                    {errors.student_id && (
                                                        <div className="error-message">Student is required.</div>
                                                    )}
                                                </div>
                                            </Col>

                                            <Col md="6">
                                                <div className="input-group mb-3">
                                                    <Label for="course_id" className="input-label">
                                                        <i className="input-icon bi bi-book"></i> Course
                                                    </Label>
                                                    <select
                                                        id="course_id"
                                                        className={`custom-select ${classnames({
                                                            'input-error': errors.course_id,
                                                        })}`}
                                                        {...register('course_id', { required: true })}
                                                    >
                                                        <option value="">Select a Course</option>
                                                        {courses &&
                                                            courses.map((course) => (
                                                                <option key={course.id} value={course.id}>
                                                                    {course.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                    {errors.course_id && (
                                                        <div className="error-message">Course is required.</div>
                                                    )}
                                                </div>
                                            </Col>

                                            <Col md="6">
                                                <div className="input-group mb-3">
                                                    <Label for="date" className="input-label">
                                                        <i className="input-icon bi bi-calendar"></i> Date
                                                    </Label>
                                                    <input
                                                        type="date"
                                                        id="date"
                                                        className={`custom-input ${classnames({
                                                            'input-error': errors.date,
                                                        })}`}
                                                        {...register('date', { required: true })}
                                                    />
                                                    {errors.date && (
                                                        <div className="error-message">Date is required.</div>
                                                    )}
                                                </div>
                                            </Col>

                                            <Col md="6">
                                                <div className="input-group mb-3">
                                                    <Label for="status" className="input-label">
                                                        <i className="input-icon bi bi-check-circle"></i> Status
                                                    </Label>
                                                    <select
                                                        id="status"
                                                        className={`custom-select ${classnames({
                                                            'input-error': errors.status,
                                                        })}`}
                                                        {...register('status', { required: true })}
                                                    >
                                                        <option value="">Attendance Status</option>
                                                        <option value="Present">Present</option>
                                                        <option value="Absent">Absent</option>
                                                        <option value="Late">Late</option>
                                                    </select>
                                                    {errors.status && (
                                                        <div className="error-message">Status is required.</div>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="d-flex justify-content-center mt-4">
                                            <Button color="success" className="submit-button" type="submit">
                                                Submit Attendance
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

export default AttendanceCreate;
