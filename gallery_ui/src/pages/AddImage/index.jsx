import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import "./style.css";

const AddImage = () => {
  const navigate = useNavigate();

  const defaultValues = {
    name: "",
    category: "",
    image: "",
  };

  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      category: Yup.string().required("Required"),
      image: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(500, "Must be 500 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:3000/images", values)
        .then((response) => {
          console.log(response);
          console.log(values);
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <div className="body">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Card className="cardstyle mt-5">
              <Form className="custom-form" onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    placeholder="Enter name"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-danger">{formik.errors.name}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="image">
                  <Form.Label> Image</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    onChange={formik.handleChange}
                    value={formik.values.image}
                    placeholder="Enter image"
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.image && formik.errors.image && (
                    <div className="text-danger">{formik.errors.image}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                    onBlur={formik.handleBlur}
                    className="custom-select"
                  >
                    <option value="">Select category</option>
                    <option value="actor">Actor</option>
                    <option value="comedian">Comedian</option>
                    <option value="director">Director</option>
                    <option value="god">God</option>
                  </Form.Control>
                  {formik.touched.category && formik.errors.category && (
                    <div className="text-danger">{formik.errors.category}</div>
                  )}
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddImage;
