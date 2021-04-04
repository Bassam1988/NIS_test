import React, { Component, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProducts, delProduct } from "../../redux/actions/productsActions";

function Products() {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    
  }, []);
  return (
    <Fragment>
      <h1>Products List</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Seller</th>
            <th>Main Category</th>
            <th>Sub Category</th>
            <th>Address</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                 <Link to={{pathname: '/viewProduct/',state: {product1:product} }} >
                    {product.name}
                  </Link>
                </td>
                <td>{product.seller.username}</td>
                <td>{product.m_category.name}</td>
                <td>{ product.s_categories.length!=0 ? product.s_categories[0].name : "no sub category"}</td>
                <td>{product.addresses.length!=0 ? product.addresses[0].country: "No Address"}</td>
                <td>
                  <img src={product.img}></img>{" "}
                </td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch(delProduct(product.id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <b>No Products</b>
          )}
        </tbody>
      </table>
    </Fragment>
  );
}

export default Products;
/*export class Products extends Component {
  static propTypes = {
    products: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    return (
      <Fragment>
        <h1>Products List</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Seller</th>
              <th>Main Category</th>
              <th>Sub Category</th>
              <th>Address</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.seller}</td>
                <td>{product.m_category}</td>
                <td>{product.s_categories[0]}</td>
                <td>{product.addresses[0]}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={this.props.delProduct.bind(this, product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
});

//const mapDispatchtoProps =

export default connect(mapStateToProps, { getProducts, delProduct })(Products);*/
