import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { emailValidation, passwordValidation } from '../../utils/validation';
import Pagination from '../../components/Pagination';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Login () {

  const [ isAuth, setIsAuth ] = useState(false);
  const [ products, setProducts ] = useState([]);
  const [ pagination, setPagination ] = useState({});

  const getProducts = async (page=1) => {
    try {
      const response = await axios.get(`${API_BASE}/api/${API_PATH}/admin/products?page=${page}`)
      setProducts(response.data.products);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error(error?.response?.data?.message);
    }
    
  }

  // const [ formData, setFormData ] = useState({
  //   username: "lifesunny719@gmail.com",
  //   password: ""
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   // React 自動傳入當前 state 值 setState((當前狀態) => (新狀態))
  //   setFormData(prevData => ({
  //     ...prevData,
  //     [name]: value
  //   }))
  // }

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({
     mode: "onChange",
     defaultValues: { 
      username: 'lifesunny719@gmail.com' 
      }
    },
  );

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, data);
      const { expired, token } = response.data;
      // MDN: document.cookie = "someCookieName=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
      document.cookie = `jiaToken=${token}; expires=${new Date(expired)};`;
      axios.defaults.headers.common.Authorization = token;

      navigate('/admin');

      getProducts();
      setIsAuth(true);

    } catch (error) {
      alert('登入失敗：' + error?.response?.data?.message);
    }
  }

  return (<>
    <div className="container text-center min-vh-100">
          <div className="row login d-flex flex-column justify-content-center align-items-center min-vh-100">
            <h1 className="h3 mb-3 font-weight-normal">請先登入</h1>
            <div className="col-md-8">
              <form id="form" 
                className="w-100 mx-auto p-3 col-md-6 col-lg-4"
                style={{ maxWidth: "350px" }}
                onSubmit={ handleSubmit(onSubmit) }
                >
                <div className="form-floating mb-3">
                  <input 
                    type="email"
                    className={`form-control ${ errors.username && 'is-invalid'}`}
                    id="username"
                    name="username"
                    placeholder="test@example.com"
                    // defaultValue={ formData.username }
                    // onChange={ handleInputChange }
                    autoFocus
                    {...register('username', emailValidation)}
                  />
                  <label htmlFor="username">Email address</label>
                  { errors.username && 
                    (<p className="invalid-feedback">{ errors?.username?.message }</p>)
                  }
                </div>
                <div className="form-floating mb-3">
                  <input 
                    type="password"
                    className={`form-control ${ errors.password && 'is-invalid'}`}
                    id="password"
                    name="password"
                    placeholder="Password"
                    // defaultValue={ formData.password }
                    // onChange={ handleInputChange }
                    {...register('password', passwordValidation)}
                  />
                  <label htmlFor="password">Password</label>
                  { errors.password && 
                    (<p className="invalid-feedback">{ errors?.password?.message }</p>)
                  }
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mt-3"
                  disabled={ !isValid }
                >登入</button>
              </form>
            </div>
          </div>
        </div>
  </>)
}

export default Login