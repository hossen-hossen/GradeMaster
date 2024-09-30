/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Col, Row, Form, Label, Card, CardBody, Button } from 'reactstrap';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import FullScreenLoader from '../../components/FullScreenLoader';
import { useGetAttendanceQuery, useUpdateAttendanceMutation } from '../../redux/api/attendanceAPI';
import { useGetStudentsQuery } from '../../redux/api/studentAPI';
import { useGetCoursesQuery } from '../../redux/api/courseAPI';

const AttendanceUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: attendance, refetch } = useGetAttendanceQuery(id);
    const { data: students, isLoading: studentsLoading } = useGetStudentsQuery();
    const { data: courses, isLoading: coursesLoading } = useGetCoursesQuery();
    const [updateAttendance, { isLoading, isError, error, isSuccess, data }] = useUpdateAttendanceMutation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        refetch();
    }, [refetch]);

    useEffect(() => {
        if (attendance) {
            const fields = ['student_id', 'course_id', 'date', 'status'];
            fields.forEach((field) => setValue(field, attendance[field]));
        }
    }, [attendance]);

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || 'Attendance updated successfully');
            navigate('/attendances');
        }

        if (isError) {
            const errorMsg = error?.data?.message || error?.data || 'Error occurred';
            toast.error(errorMsg);
        }
    }, [isSuccess, isError]);

    const onSubmit = (formData) => {
        updateAttendance({ id, attendance: formData });
    };

    return (
        <>
            {isLoading || studentsLoading || coursesLoading ? (
                <FullScreenLoader />
            ) : (
                <div className="attendance-update-container">
                    <Row className="d-flex justify-content-center align-items-center min-vh-100">
                        <Col md={8}>
                            <Card className="shadow-lg rounded-3 attendance-card">
                                <CardBody className="p-4">
                                    <h2 className="text-center mb-4">Update Attendance</h2>
                                    <Form onSubmit={handleSubmit(onSubmit)} className="attendance-form">
                                        <Row>
                                            <Col md="6">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className={`form-select ${classnames({
                                                            'is-invalid': errors.student_id,
                                                        })}`}
                                                        {...register('student_id', { required: true })}
                                                    >
                                                        <option value="">Select Student</option>
                                                        {students &&
                                                            students.map((student) => (
                                                                <option key={student.id} value={student.id}>
                                                                    {student.name}
                                                                </option>
                                                            ))}
                                                    </select>
                                                    <Label for="student_id" className="form-label">Student</Label>
                                                    {errors.student_id && (
                                                        <div className="invalid-feedback">Student is required.</div>
                                                    )}
                                                </div>
                                            </Col>

                                            <Col md="6">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className={`form-select ${classnames({
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
                                                    <Label for="course_id" className="form-label">Course</Label>
                                                    {errors.course_id && (
                                                        <div className="invalid-feedback">Course is required.</div>
                                                    )}
                                                </div>
                                            </Col>

                                            <Col md="6">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="date"
                                                        className={`form-control ${classnames({
                                                            'is-invalid': errors.date,
                                                        })}`}
                                                        {...register('date', { required: true })}
                                                    />
                                                    <Label for="date" className="form-label">Date</Label>
                                                    {errors.date && (
                                                        <div className="invalid-feedback">Date is required.</div>
                                                    )}
                                                </div>
                                            </Col>

                                            <Col md="6">
                                                <div className="form-floating mb-3">
                                                    <select
                                                        className={`form-select ${classnames({
                                                            'is-invalid': errors.status,
                                                        })}`}
                                                        {...register('status', { required: true })}
                                                    >
                                                        <option value="">Select Status</option>
                                                        <option value="Present">Present</option>
                                                        <option value="Absent">Absent</option>
                                                        <option value="Late">Late</option>
                                                    </select>
                                                    <Label for="status" className="form-label">Status</Label>
                                                    {errors.status && (
                                                        <div className="invalid-feedback">Status is required.</div>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="d-grid mt-4">
                                            <Button color="primary" className="submit-button" type="submit">
                                                Update Attendance
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

export default AttendanceUpdate;
