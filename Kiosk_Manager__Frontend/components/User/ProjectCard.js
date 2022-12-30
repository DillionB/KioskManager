import { Col } from "react-bootstrap";

import ReactS3 from "react-s3";
import Admin from './index'


export const ProjectCard = ({ TempName, TempDesc, FileUploadName, Lat, Lng, pan }) => {
    return (
        <Col size={1} sm={1} md={1}>
            <div className="proj-imgbx" onClick={() => {

                console.log(pan(Lat, Lng))
                console.log(FileUploadName)
            }} >
                <img src={`https://kiosk-manager-storage.s3.us-west-2.amazonaws.com/${FileUploadName}`} />
                <div className="proj-txtx">
                    <h4>{TempName}</h4>
                    <span>{TempDesc}</span>
                </div>
            </div>
        </Col>
    )
}
