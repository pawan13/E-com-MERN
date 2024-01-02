import React, { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCat } from "../../pages/category/CatSlice";
import { Link } from "react-router-dom";

export const ProductTable = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.products);
  const [display, setDisplay] = useState([]);
  useEffect(() => {
    setDisplay(productList);
  }, [productList]);


  const handleOnSearch = (e) => {
    const { value } = e.target;

    setDisplay(
      productList.filter(({ title }) =>
        title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };
  return (
    <div className="mt-5">
      <div className="w-25 mb-3">
        <Form.Control onChange={handleOnSearch} placeholder="Search by name" />
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th> Status</th>
            <th> Name</th>
            <th>Slug </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {display.map((item, i) => (
            <tr key={item.slug}>
              <td>{i + 1}</td>
              <td>
                <img src={item.thumbnail} width="150px" />
              </td>
              <td>
                <span className={item.status}>{item.status}</span>
              </td>
              <td>{item.title}</td>
              <td>{item.slug}</td>
              <td>
              <Link to={`/product/edit/${item.slug}`}>
                  <Button variant="warning">Edit</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
