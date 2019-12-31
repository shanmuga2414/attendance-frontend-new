
import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Button, FormGroup, Label, Input } from "reactstrap";
import date from 'date-and-time';
// core components

// import { fetchAttendance } from '../redux/actions';
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";



class ReportAttendance extends React.Component {
  constructor(props) {
    super(props);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const { name, team, employeeId, id } = currentUser;
    this.state = {
      icurrentDate: '',
      ocurrentDate: '',
      signInDisabled: false,
      signOutDisabled: false,
      employeeId: id

    }
  }

  componentDidMount() {
    const payload = {
      post: this.state.employeeId
    }
    console.log(payload)
    //this.props.fetchAttendance(payload);
  }
  signIn = (e) => {
    const now = new Date();
    const ctime = date.format(now, 'YYYY/MM/DD HH:mm:ss');
    let d = Date(Date.now());
    console.log(ctime)
    let cdate = d.toString()
    this.setState({
      icurrentDate: cdate,
      signInDisabled: true
    })
    const that = this;
    console.log(this.state)
    axios({
      method: 'post',
      url: 'http://localhost:8080/employee/attendanceReport',
      data: { employee: this.state.employeeId, signIn: ctime }
    }).then(function (response) {
      if (response.status === 200) {
        console.log(response)
      } else {
        console.log(response.data.message)
        that.setState({
          errorMessage: response.data.message
        })
      }
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  signOut = () => {
    let d = Date(Date.now());
    let cdate = d.toString()
    this.setState({
      ocurrentDate: cdate,
      signOutDisabled: true
    })
  }
  render() {
    // const { attendanceReports } = this.props;
    console.log(this.props);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    const { name, team, employeeId } = currentUser;

    const options = [];
    for (let i = 0; i < 8; i += 0.5) { options.push(i); }


    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            {/* /   <h1>{JSON.stringify(this.props.userdetails)}</h1> */}
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
                      <Button color="success" size="lg" disabled={this.state.signInDisabled} onClick={this.signIn}><b>Sign In</b></Button>
                    </Col>
                    <Col xs="4">
                      <span className="timeDisplay">
                        {this.state.icurrentDate !== "" &&

                          'Your Sign In time is'
                        }
                        <br />
                        {this.state.icurrentDate !== "" &&

                          <b> {this.state.icurrentDate} {this.state.signIn} </b>
                        }
                      </span>
                    </Col>
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
                      <Button color="danger" size="lg" disabled={this.state.signOutDisabled} onClick={this.signOut}><b>Sign out</b></Button>
                    </Col>
                    <Col xs="4"><span className="timeDisplay">
                      {this.state.ocurrentDate !== "" &&

                        'Your Sign Out time is'
                      }
                      <br />
                      {this.state.ocurrentDate !== "" &&

                        <b> {this.state.ocurrentDate} </b>
                      }
                    </span></Col>
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
// const mapStateToProps = (state, ownProps) => {
//   return {
//     post: state.post,
//     attendanceReports: state.AttendanceReports
//   }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     fetchAttendance: (payload, history) => dispatch(fetchAttendance(payload, history))
//   }
// }


// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReportAttendance));
