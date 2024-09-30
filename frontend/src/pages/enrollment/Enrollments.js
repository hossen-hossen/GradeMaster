/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import {
    Col,
    Row,
    Card,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Badge
} from "reactstrap";
import { useGetEnrollmentsQuery } from "../../redux/api/enrollmentAPI";
import DataTable from 'react-data-table-component';
import { useEffect, useState } from "react";
import { ChevronDown, MoreVertical, Edit } from "react-feather";

const Enrollments = () => {
    const navigate = useNavigate();
    const paginationRowsPerPageOptions = [15, 30, 50, 100];
    const [searchItem, setSearchItem] = useState('');
    const queryParams = { q: searchItem };
    const { data: enrollmentsData, refetch } = useGetEnrollmentsQuery(queryParams);

    useEffect(() => {
        refetch();
    }, []);

    const columns = () => [
        {
            name: 'Course Name',
            selector: (row) => row.course_name || '',
            sortable: true
        },
        {
            name: 'Students',
            cell: (row) => (
                <>
                    {row.students.map((student) => (
                        <Badge key={student.student_id} color="warning" className="mx-1">
                            {student.student_name}
                        </Badge>
                    ))}
                </>
            ),
            sortable: false
        },
        {
            name: 'Actions',
            width: '120px',
            cell: (row) => {
                return (
                    <UncontrolledDropdown>
                        <DropdownToggle tag="div" className="btn btn-sm">
                            <MoreVertical size={14} className="cursor-pointer action-btn" />
                        </DropdownToggle>
                        <DropdownMenu end container="body">
                            <DropdownItem className="w-100" onClick={() => navigate(`/enrollments/enrollment-update/${row.course_id}`)}>
                                <Edit size={14} className="mr-50" />
                                <span className="align-middle mx-2">Update</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                );
            }
        }
    ];

    const handleFilter = (q) => {
        setSearchItem(q);
    };

    return (
        <div className="main-content container">
            <Row className="my-3">
                <Col>
                    <h4 className="main-title">Enrollments</h4>
                </Col>
            </Row>
            {/* <Row className="my-3">
                <Col>
                    <a href="/enrollments/enrollment-create" className="btn btn-outline-primary">Create Enrollment</a>
                </Col>
            </Row> */}
            <Card className="p-4">
                <DataTable
                    title="Enrollments"
                    data={enrollmentsData}
                    responsive
                    className="react-dataTable"
                    noHeader
                    pagination
                    paginationRowsPerPageOptions={paginationRowsPerPageOptions}
                    columns={columns()}
                    sortIcon={<ChevronDown />}
                />
            </Card>
        </div>
    );
};

export default Enrollments;
