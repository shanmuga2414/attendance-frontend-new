
import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Button, FormGroup, Label, Input } from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";


class ReportAttendance extends React.Component {

  render() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const { name, team, employeeId } = currentUser;

    const options = [];
    for (let i = 0.5; i < 8; i += 0.5) { options.push(i); }
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={6}>
              <Card>
                <CardHeader>
                  <h5 className="title">Contract / Temp Staff Details</h5>
                </CardHeader>
                <CardBody className="all-icons">
                  <Row>
                    <Col xs="6"><b>Staff Id:</b> {employeeId}</Col>
                    <Col xs="6"><b>Group:</b> ISG</Col>
                  </Row>
                  <Row>&nbsp;</Row>
                  <Row>
                    <Col xs="6" ><b>Name:</b> {name}</Col>
                    <Col xs="6"><b>Department:</b> CIS</Col>
                  </Row>
                  <Row>&nbsp;</Row>
                  <Row>
                    <Col xs="6"><b>Work hours:</b> 8.5 hrs</Col>
                    <Col xs="6"><b>Section:</b> {team}</Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <CardHeader>
                  <h5 className="title">Supervisor Details</h5>
                </CardHeader>
                <CardBody className="all-icons">
                  <Row>
                    <Col xs="6"><b>Staff Id:</b> 54654s</Col>
                    <Col xs="6"><b>Group:</b> ISG</Col>
                  </Row>
                  <Row>&nbsp;</Row>
                  <Row>
                    <Col xs="6" ><b>Name:</b> Wallace</Col>
                    <Col xs="6"><b>Department:</b> CIS</Col>
                  </Row>
                  <Row>&nbsp;</Row>
                  <Row>
                    <Col xs="6">&nbsp;</Col>
                    <Col xs="6"><b>Section:</b> {team}</Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card>
                <CardHeader>
                  <h5 className="title">Attendance Sign In</h5>
                </CardHeader>
                <CardBody className="all-icons">
                  <Row>
                    <Col xs="8">Click the buttton for sign in  <br />
                      <Button color="success" size="lg"><b>Sign In</b></Button>
                    </Col>
                    <Col xs="4"></Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Card>
                <CardHeader>
                  <h5 className="title">Attendance Sign Out</h5>
                </CardHeader>
                <CardBody className="all-icons">
                  <Row>
                    <FormGroup>
                      <Label for="exampleSelect" className="signOff">&nbsp;<b> Time-Off taken for the day (if any):&nbsp;&nbsp; </b></Label>
                      <Input type="select" name="select" id="exampleSelect" className="othours">
                        {options.map(option => (
                          <option key={option} value={option * 60}>
                            {option} hours
          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Row>
                  <Row>&nbsp;</Row>
                  <Row>
                    <Col xs="8">Click the buttton for sign off <br />
                      <Button color="danger" size="lg"><b>Sign out</b></Button>
                    </Col>
                    <Col xs="4"></Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default ReportAttendance;
