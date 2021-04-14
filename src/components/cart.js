import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../store/actions/cart.actions";

class Cart extends Component {
  componentDidMount() {
    const { loadCarts } = this.props;
    // 向服务器端发送请求 获取购物车列表数据
    loadCarts();
  }
  changeProductNumber (cid, event) {
    const { changeServiceProductNumber } = this.props;
    // 获取商品的最新数量
    const count = event.target.value;
    // 向服务器端发送请求 告诉服务器端我们要将哪一个商品的数量更改成什么
    changeServiceProductNumber({cid, count});
  }
  render() {
    const { carts, deleteProductFromCart } = this.props;
    return (
      <section className="container content-section">
        <h2 className="section-header">购物车</h2>
        <div className="cart-row">
          <span className="cart-item cart-header cart-column">商品</span>
          <span className="cart-price cart-header cart-column">价格</span>
          <span className="cart-quantity cart-header cart-column">数量</span>
        </div>
        <div className="cart-items">
          {carts.map((product) => (
            <div className="cart-row" key={product.id}>
              <div className="cart-item cart-column">
                <img
                  className="cart-item-image"
                  src={`http://localhost:3005${product.thumbnail}`}
                  width="100"
                  height="100"
                  alt=""
                />
                <span className="cart-item-title">
                  {product.title}
                </span>
              </div>
              <span className="cart-price cart-column">￥{product.price}</span>
              <div className="cart-quantity cart-column">
                <input className="cart-quantity-input" type="number" value={product.count} onChange={e => this.changeProductNumber(product.id, e)}/>
                <button onClick={() => deleteProductFromCart(product.id)} className="btn btn-danger" type="button">
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <strong className="cart-total-title">总价</strong>
          <span className="cart-total-price">￥{
            carts.reduce((total, product) => {
              return total += product.count * product.price
            },0)
          }</span>
        </div>
      </section>
    );
  }
}

// mapStateToProps：将store中的state传递到组件的props中，
// mapStateToProps方法的参数是state，返回值是一个对象，会传递到组件中
const mapStateToProps = (state) => ({
  carts: state.carts,
});

const mapDispatchToProps = (dispatch) => ({
  // bindActionCreators:接收action和dispatch，组合成一个action函数对象
  ...bindActionCreators(cartActions, dispatch),
});

//connect方法返回一个高阶组件，然后传入Cart组件进行导出
// 1. connect 会帮助我们去订阅 store，当store中的状态发生了变化后，可以帮我们重新渲染组件
// 2. connect 方法可以让我们获取 store 中的状态，将状态通过组建的props属性映射给组件
// 3. connect 方法可以让我们获取 dispatch 方法
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
