import React, { useEffect } from "react";
import Header from "./Header";
import '../assets/css/products.css';
import {
  Button,
  Card,
  CardFooter,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getProducts } from "../redux/slices/ProductSlice";
import { Link } from "react-router-dom";

function Products() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productsList = useAppSelector((state) => state.product.products);
  return (
    <>
      <Header />
      <div className="productsList">
        <h1 className="sectionTitle">منتجاتنا</h1>
        <Container>
          
        </Container><Row>
            {productsList.map((product) => 
              <Col sm="4" key={product.id}>
                <Card body>
                  <CardTitle tag="h5" >{product.name}</CardTitle>
                  <CardText className="productDesc"> وصف المنتج :{product.description}</CardText>
                  <CardText className="productBrand">البراند : {product.brand}</CardText>
                  <CardText className="productPrice"> السعر: {product.price} جنيه مصري </CardText>
                  <CardText className="productCategory"> قسم : <Link to={`/category/${product.category.id}`}>{product.category.name}</Link></CardText>
                  <div className="images">
                    {product.images.map(image => 
                      <img src={image.url} alt="" width='100px' className="productImage"/>
                    )}
                  </div>
                  {product.variations.length !== 0 ? <table className="variationTable">
                    <thead>
                    <tr>
                        <th className="productSizes">المقاسات المتاحة </th>
                        <th className="productColors">الألوان المتاحة</th>
                        <th className="productInStock">المتبقي</th>
                        <th className=""></th>
                      </tr>
                    </thead>
                    {product.variations.map(variation =>( 
                      <tr>
                        <td className="productSizes">{variation.size.size_name}</td>
                        <td className="productColors">{variation.color.color_name}</td>
                        <td className="productInStock">{variation.stock}</td>
                        <td><Button className="btn btn-primary btn-sm">Add To Cart</Button></td>
                      </tr>
                  ))}</table> : ''}
                </Card>
              </Col>
            )}
          </Row>
      </div>
    </>
  );
}

export default Products;
