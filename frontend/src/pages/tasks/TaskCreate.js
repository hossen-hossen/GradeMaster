/* eslint-disable react-hooks/exhaustive-deps */
import { Col, Row, Form, Label, Card, CardBody, Button } from "reactstrap";
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import FullScreenLoader from "../../components/FullScreenLoader";
import { useCreateTaskMutation } from "../../redux/api/taskAPI";
import { useGetCoursesQuery } from "../../redux/api/courseAPI";

const TaskCreate = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const [createTask, { isLoading, isSuccess, isError, error, data }] = useCreateTaskMutation();
    const { data: courses } = useGetCoursesQuery();

    const onSubmit = (formData) => {
        createTask(formData);
    };

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
            navigate("/tasks");
        }

        if (isError) {
            const errorMsg = error?.data?.message || error?.data || 'Error occurred';
            toast.error(errorMsg, { position: 'top-right' });
        }
    }, [isLoading]);

    return (
        <>
            {isLoading ? <FullScreenLoader /> : (
                <div className="task-container">
                    <Row className="justify-content-center mt-5">
                        <Col md={8}>
                            <Card className="shadow-lg task-card">
                                <CardBody className="p-5">
                                    <h2 className="text-center mb-4">Create New Task</h2>
                                    <Form onSubmit={handleSubmit(onSubmit)} className="task-form">
                                        <Row>
                                            <Col md="6">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="name">Task Name</Label>
                                                    <input
                                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                        type="text"
                                                        {...register('name', { required: true })}
                                                        placeholder="Enter task name"
                                                    />
                                                    {errors.name && <div className="invalid-feedback">Task name is required.</div>}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="type">Type</Label>
                                                    <select
                                                        className={`form-select ${errors.type ? 'is-invalid' : ''}`}
                                                        {...register('type', { required: true })}
                                                    >
                                                        <option value="">Select Type</option>
                                                        <option value="Assignment">Assignment</option>
                                                        <option value="Exam">Exam</option>
                                                    </select>
                                                    {errors.type && <div className="invalid-feedback">Type is required.</div>}
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="date">Date</Label>
                                                    <input
                                                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                                                        type="date"
                                                        {...register('date')}
                                                    />
                                                </div>
                                            </Col>
                                            <Col md="6">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="course_id">Select Course</Label>
                                                    <select
                                                        className={`form-select ${errors.course_id ? 'is-invalid' : ''}`}
                                                        {...register('course_id', { required: true })}
                                                    >
                                                        <option value="">Select Course</option>
                                                        {courses && courses.map(course => (
                                                            <option key={course.id} value={course.id}>{course.name}</option>
                                                        ))}
                                                    </select>
                                                    {errors.course_id && <div className="invalid-feedback">Course is required.</div>}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <div className="form-group mb-4">
                                                    <Label className="form-label" for="description">Description</Label>
                                                    <textarea
                                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                                        rows={4}
                                                        {...register('description', { required: true })}
                                                        placeholder="Enter task description"
                                                    ></textarea>
                                                    {errors.description && <div className="invalid-feedback">Description is required.</div>}
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="d-grid mt-4">
                                            <Button color="primary" className="submit-button" type="submit">Submit Task</Button>
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

export default TaskCreate;
