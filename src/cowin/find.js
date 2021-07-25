import React ,{useState ,useEffect}from 'react'
import { Alert,Nav,Card,Navbar,Form,CardColumns,ListGroup,Button,ListGroupItem } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import * as moment from 'moment'
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
function Daily(){
        
        const [pin ,setPin]=useState();
        const [startDate, setStartDate] = useState(new Date());
        const [data,setData]=useState([]);
        const handleSubmit= (evt) => {
            evt.preventDefault();
            if (pin.length<6){
                alert("Invalid Pin Code");
                setPin("")
                setData([])
            }
            else if (pin.length>6){
                alert("Invalid Pin Code");
                setPin("")
                setData([])
            }
           else{
                
                console.log(startDate.getDate())
                const date= startDate.getDate()
                var month=startDate.getUTCMonth()
                const year= startDate.getFullYear()
                console.log(date,month+1,year)
                const newMonth=month+1
                axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}-0${newMonth}-${year}`)
                .then(res => {
                    if (res.data.sessions.length===0){
                        alert("vaccine not available ")
                    }
                    else{
                        console.log(res.data.sessions)
                        setData(res.data.sessions)
                    }
                    
                })
                
           }
          };
          document.title = 'Rizwan Cowin'
        return(
           
            <div>
                <div>
                    <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#">Cowin</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                        className="mr-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                        >
                        <Nav.Link href="#">Home</Nav.Link>
                        <Nav.Link href="https://rizwan-ansari-resume.web.app">About Me</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
                </div>
                <div style={{margin:"10px"}}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Pin Code</Form.Label>
                            <Form.Control type="number" placeholder="Enter Pin Code" 
                            onChange={e => setPin(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                            Enter Your Area Pin Code
                            </Form.Text>
                        </Form.Group>
                        <DatePicker dateFormat="dd-MM-yyyy" selected={startDate} popperModifiers={{
                        offset: {
                          enabled: true,
                          offset: "0px, 0px"
                        },
                        preventOverflow: {
                          enabled: true,
                          escapeWithReference: false,
                          boundariesElement: "scrollParent"
                        }
                      }} placeholderText="Select a date"
                         calendarClassName="rasta-stripes" onChange={date => setStartDate(date)} />

                        <Button disabled={!pin}  style={{margin:"20px"}} variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>    
                </div>
                <div>
                <CardColumns>
                    {data.map((e)=>(
                       
                        <Card style={{margin:"2px"}}>
                          <Card.Header>Name {e.name}</Card.Header>
                          <Card.Header>Address {e.address}</Card.Header>
                          <Card.Header>Type {e.fee_type}</Card.Header>
                            <Card.Body>
                            <Card.Title> Age {e.min_age_limit} + </Card.Title>
                            <Card.Text>
                                    Vaccine - {e.vaccine}
                            </Card.Text>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem>Dose1 - {e.available_capacity_dose1} Available</ListGroupItem>
                                <ListGroupItem>Dose2 - {e.available_capacity_dose2} Available</ListGroupItem>
                                <ListGroupItem>Date  - {e.date}</ListGroupItem>
                                <ListGroupItem>From  {e.from} - {e.to}</ListGroupItem>
                                <ListGroupItem>Fee   - {e.fee}</ListGroupItem>
                            </ListGroup>

                            </Card.Body>
                        </Card>
                        
                     
                    ))}
                    </CardColumns>
                </div>
            </div>
        )
};

export default Daily;