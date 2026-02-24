function ProductTable ( { openModal, products, INITIAL_TEMPLATE_PRODUCT } ) {
  return (<>
    <div className="container text-center mb-4">
          <h2 className="h3 mx-auto my-3">產品列表</h2>
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-primary btn-sm px-3 py-2 ms-auto mb-3"
              onClick={ () => openModal("create", INITIAL_TEMPLATE_PRODUCT) }
            >建立新的商品</button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>分類</th>
                <th>產品名稱</th>
                <th>原價</th>
                <th>售價</th>
                <th>是否啟用</th>
                <th>編輯</th>
              </tr>
            </thead>
            <tbody>
              { products && products.length > 0 ? (
                products.map( product => (
                  <tr key={product.id}>
                    <td>{ product.category}</td>
                    <td className="text-start">{ product.title }</td>
                    <td>{ product.origin_price }</td>
                    <td>{ product.price }</td>
                    <td>
                      <span className={ product.is_enabled ? "badge bg-primary" : "badge bg-secondary"}>{ product.is_enabled ? "啟用" : "未啟用" }</span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-info btn-sm"
                          onClick={() => openModal("edit", product)}
                        >編輯</button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => openModal("delete", product)}
                          onMouseEnter={ e => e.currentTarget.classList.add("text-light")}
                          onMouseLeave={ e => e.currentTarget.classList.remove("text-light")}
                        >刪除</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">尚無產品資料</td>
                </tr>
              ) }
            </tbody>
          </table>
        </div>
  </>)
}

export default ProductTable