import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../assets/css/products.css";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Form,
} from "reactstrap";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createProduct, getProducts } from "../redux/slices/ProductSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCategories } from "../redux/slices/CategorySlice";
import { colorType, sizeType } from "../redux/type";
import axios from "axios";
function Products(args: any) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const [sizes, setSizes] = useState<sizeType[]>([]);
  const [colors, setColors] = useState<colorType[]>([]);
  const [modal, setModal] = useState<Boolean>(false);
  const toggle = () => setModal(!modal);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [category_id, setCategoryId] = useState<number>(0);
  const [color_id, setColor] = useState<number>(0);
  const [size_id, setSize] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const navigate = useNavigate();
  
  const productsList = useAppSelector((state) => state.product.products);
  const categories = useAppSelector((state) => state.category.categories);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(()=> {
    const getAllSizes = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/sizes');
      setSizes(response.data.sizes);
    }
    const getAllColors = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/colors');
      setColors(response.data.colors);
    }
    getAllColors();
    getAllSizes();
  }, [])
 
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(name, description, brand, category_id, color_id, size_id, price, stock);
    dispatch(createProduct({name, description, brand, category_id, color_id, size_id, price, stock}))
    .then((result) => {
      if(result.type === "product/createProduct/fulfilled"){
        navigate('/products');
        toast.success('تمت اضافة المنتج بنجاح');
      }
    })
    setModal(false);
  };

  return (
    <>
      <Modal isOpen={modal} toggle={toggle} {...args}>
        <ModalHeader toggle={toggle}>اضافة منتج </ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <Row>
            <Col md='12'>
            <FormGroup>
              <Label className="label-control" htmlFor="name">
                اسم المنتج
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="ادخل اسم المنتج"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
            </Col>
            <Col md='12'>
            <FormGroup>
              <label className="label-control" htmlFor="password">
                وصف المنتج
              </label>
              <Input
                type="textarea"
                name="description"
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <label className="label-control" htmlFor="password">
                  سعر المنتج
                </label>
                <Input
                  type="number"
                  min="0"
                  step=".01"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(parseFloat(e.target.value))}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <label className="label-control" htmlFor="password">
                  البراند
                </label>
                <Input
                  type="text"
                  name="brand"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <label className="label-control" htmlFor="category">
                  القسم
                </label>
                <Input
                  type="select"
                  name="category"
                  id="category"
                  placeholder="اختر القسم"
                  value={category_id}
                  onChange={(e) => setCategoryId(parseFloat(e.target.value))}
                >
                  <option value='' disabled>اختر المقاس</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <label className="label-control" htmlFor="password">
                  الالوان
                </label>
                <Input
                  type="select"
                  name="color"
                  id="color"
                  placeholder="اختر القسم"
                  value={color_id}
                  onChange={(e) => setColor(parseFloat(e.target.value))}
                >
                  <option value='' disabled>اختر اللون</option>
                  {colors.map(color => (
                    <option key={color.id} value={color.id}>{color.color_name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <label className="label-control" htmlFor="password">
                  المقاس
                </label>
                <Input
                  type="select"
                  name="size"
                  id="size"
                  placeholder="اختر المقاس"
                  value={size_id}
                  onChange={(e) => setSize(parseFloat(e.target.value))}
                >
                  <option value='' disabled>اختر القسم</option>
                  {sizes.map(size => (
                    <option key={size.id} value={size.id}>{size.size_name}</option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <label className="label-control" htmlFor="password">
                  سعر المنتج
                </label>
                <Input
                  type="number"
                  min="0"
                  step="1"
                  name="stock"
                  id="stock"
                  value={stock}
                  onChange={(e) => setStock(parseFloat(e.target.value))}
                />
              </FormGroup>
            </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-md" color="primary" type="submit">
              حفظ البيانات
            </Button>{" "}
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Header />
      <div className="productsList">
        <h1 className="sectionTitle">منتجاتنا</h1>
        <Container>
          <Button color="primary" onClick={toggle}>
            اضافة منتج
          </Button>
          <Row>
            {productsList.map((product) => (
              <Col sm="4" key={product.id}>
                <Card body>
                  <CardTitle tag="h5">{product.name}</CardTitle>
                  <CardText className="productDesc">
                    {" "}
                    وصف المنتج :{product.description}
                  </CardText>
                  <CardText className="productBrand">
                    البراند : {product.brand}
                  </CardText>
                  <CardText className="productPrice">
                    {" "}
                    السعر: {product.price} جنيه مصري{" "}
                  </CardText>
                  {/* {product.variations.length !== 0 ? (
                    <table className="variationTable">
                      <thead>
                        <tr>
                          <th className="productSizes">المقاسات</th>
                          <th className="productColors">الألوان</th>
                          <th className="productInStock">المتبقي</th>
                          <th className=""></th>
                        </tr>
                      </thead>
                      <tbody>
                        {product.variations.map((variation) => (
                          <tr key={variation.id}>
                            <td className="productSizes">
                              {variation.size.size_name}
                            </td>
                            <td className="productColors">
                              {variation.color.color_name}
                            </td>
                            <td className="productInStock">
                              {variation.stock}
                            </td>
                            <td>
                              <Button className="btn btn-primary btn-sm">
                                Add To Cart
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    ""
                  )} */}
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Products;
