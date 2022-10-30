import { Col } from "react-bootstrap";


import User from './index'



export const ProjectCard = ({ title, description, imgUrl, lat, lng, pan }) => {
  return (
    <Col size={1} sm={1} md={1}>
          <div className="proj-imgbx" onClick={() => {
             
             console.log(pan(lat, lng))     
          }} >
        <img src={imgUrl} />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  )
}
