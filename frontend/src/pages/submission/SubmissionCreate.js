/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Form, Label, Card, CardBody, Button } from "reactstrap";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import FullScreenLoader from "../../components/FullScreenLoader";
import { useCreateTaskSubmissionMutation } from "../../redux/api/taskSubmissionAPI";
import { useGetStudentsQuery } from "../../redux/api/studentAPI";
import { useGetTasksQuery } from "../../redux/api/taskAPI";
import { toast } from 'react-toastify';

const SubmissionCreate = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [createTaskSubmission, { isLoading, isSuccess, isError, error, data }] = useCreateTaskSubmissionMutation();
    const { data: students } = useGetStudentsQuery();
    const { data: tasks } = useGetTasksQuery();

    const onSubmit = (formData) => {
        createTaskSubmission(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
            navigate("/task-submissions");
        }

        if (isError) {
            const errorMsg = error?.data?.message || error?.data || 'Error occurred';
            toast.error(errorMsg, { position: 'top-right' });
        }
    }, [isLoading]);

    return (
        <>
            {isLoading ? <FullScreenLoader /> : (
                <div className="submission-container">
                    <Row className="justify-content-center mt-5">
                        <Col md={8}>
                            <Card className="shadow-lg submission-card">
                                <CardBody className="p-5">
                                    <h2 className="text-center mb-4">Create Task Submission</h2>
                                    <Form onSubmit={handleSubmit(onSubmit)} className="submission-form">
                                        <Row>
                                            <Col md="6">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="grade">Grade</Label>
                                                    <input
                                                        className={`form-control ${errors.grade ? 'is-invalid' : ''}`}
                                                        type="number"
                                                        {...register('grade', { required: true })}
                                                        placeholder="Enter grade"
                                                    />
                                                    {errors.grade && <div className="invalid-feedback">Grade is required.</div>}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="submission_date">Submission Date</Label>
                                                    <input
                                                        className={`form-control ${errors.submission_date ? 'is-invalid' : ''}`}
                                                        type="date"
                                                        {...register('submission_date', { required: true })}
                                                    />
                                                    {errors.submission_date && <div className="invalid-feedback">Submission Date is required.</div>}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="student_id">Select Student</Label>
                                                    <select
                                                        className={`form-select ${errors.student_id ? 'is-invalid' : ''}`}
                                                        {...register('student_id', { required: true })}
                                                    >
                                                        <option value="">Select Student</option>
                                                        {students && students.map(student => (
                                                            <option key={student.id} value={student.id}>{student.name}</option>
                                                        ))}
                                                    </select>
                                                    {errors.student_id && <div className="invalid-feedback">Student is required.</div>}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="task_id">Select Task</Label>
                                                    <select
                                                        className={`form-select ${errors.task_id ? 'is-invalid' : ''}`}
                                                        {...register('task_id', { required: true })}
                                                    >
                                                        <option value="">Select Task</option>
                                                        {tasks && tasks.map(task => (
                                                            <option key={task.id} value={task.id}>{task.name}</option>
                                                        ))}
                                                    </select>
                                                    {errors.task_id && <div className="invalid-feedback">Task is required.</div>}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="feedback">Feedback</Label>
                                                    <textarea
                                                        className={`form-control ${errors.feedback ? 'is-invalid' : ''}`}
                                                        rows={4}
                                                        {...register('feedback', { required: true })}
                                                        placeholder="Enter feedback"
                                                    ></textarea>
                                                    {errors.feedback && <div className="invalid-feedback">Feedback is required.</div>}
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
}

export default SubmissionCreate;
