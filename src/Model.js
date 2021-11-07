import { Modal, Button, Row, Col, Image } from "react-bootstrap";
import { useState } from "react";
import { saveAs } from "file-saver";

export default function Model(props) {
  const [download, setDownload] = useState();
  const image = props.current;
  const makeit = () => {
    saveAs(download || image.src.original, "image.jpg");
  };

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Body
        className={`${
          props.mode ? "bg-dark text-white" : "bg-light text-dark"
        } d-flex flex-column align-items-center`}
      >
        <div className="display-6">
          Captured By {image && image.photographer}
        </div>

        <Image rounded src={image && image.src.medium}></Image>

        <div className="my-2 d-flex flex-grow">
          {image &&
            Object.keys(image.src).map((item) => (
              <Button
                className="m-1"
                variant="outline-primary"
                onClick={() => {
                  setDownload(image.src[item]);
                }}
              >
                <div className="text-uppercase">{item}</div>
              </Button>
            ))}
        </div>
        <Col>
          <Button
            size="lg"
            className="m-1"
            variant="outline-success"
            onClick={makeit}
          >
            Download
          </Button>
          <Button
            className="mt-auto"
            size="lg"
            variant="danger"
            onClick={() => {
              props.setModalShow(false);
            }}
          >
            X Close
          </Button>
        </Col>
      </Modal.Body>
    </Modal>
  );
}
