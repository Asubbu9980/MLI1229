import React from "react";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import "./style.css";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get("http://localhost:3000/images/get").then((res) => {
          console.log("Res===>", res);
          setImage(res.data);
          setFilteredImages(res.data);
          setImages(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  function searchname(e) {
    setSearchText(e.target.value);

    let text = e.target.value;
    let filtered = images;
    if (selectedCategory) {
      filtered = filtered.filter((item) => {
        return item.category === selectedCategory;
      });
    }
    if (text) {
      filtered = filtered.filter((item) => {
        return item.name.toLowerCase().includes(text.toLowerCase());
      });
    }
    setFilteredImages(filtered);
  }

  function handleCategoryChange(e) {
    const category = e.target.value;
    setSelectedCategory(category);

    let filtered = images;
    if (searchText) {
      filtered = filtered.filter((item) => {
        return item.name.toLowerCase().includes(searchText.toLowerCase());
      });
    }
    if (category) {
      filtered = filtered.filter((item) => {
        return item.category === category;
      });
    }
    setFilteredImages(filtered);
  }

  return (
    <>
      <Container>
        <div class="form-container">
          <Form.Group className="mb-3 " controlId="category">
            <Form.Label className="select-label">Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="custom-select"
            >
              <option value="">All Categories</option>
              <option value="actor">Actor</option>
              <option value="comedian">Comedian</option>
              <option value="director">Director</option>
              <option value="god">God</option>
            </Form.Control>
          </Form.Group>

          <input
            type="text"
            placeholder="Search by name..."
            value={searchText}
            onChange={searchname}
            className="custom-input"
          />
        </div>
        <Row className="justify-content-center justify-content-space-between">
          {/* <div className="d-flex">  */}
          {filteredImages.map((each, i) => {
            return (
              <Col lg="3" xs="12" md="6">
                <Card className="mt-5 custom-card ">
                  <Card.Img variant="top" className="image-card" src={each.image} />
                  <Card.Body>
                    <Card.Title>{each.name}</Card.Title>
                    <Card.Text>{each.category}</Card.Text>
                  </Card.Body>

                  <Card.Body></Card.Body>
                </Card>
              </Col>
            );
          })}

          {/* </div> */}
        </Row>
      </Container>
    </>
  );
};

export default Gallery;
