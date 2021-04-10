import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
//import EditProduct from './editProduct'
//import convertToRupiah from './convertToRupiah'
//import { apiProductMaster, apiProductTransaction, apiUserMaster } from '../../config/apiUrl'
//import { toast } from 'react-toastify'
import { backend_url } from '../backend-config'

export default function User() {
  const [showModal, setShowModal] = React.useState(false)
  const history = useHistory()
  const [Product, setProduct] = useState([]);
  const [User, setUser] = useState([]);
  const [search, setSearch] = useState('')
  const [showEdit, setShowEdit] = useState(false)
  const [prodToEdit, setProdToEdit] = useState()
  const [product_name, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [prod_id, setProdId] = useState()
  const [erorr, setErorr] = useState('')
  

  const onClickAddProduct = () => {
    history.push('/tambahProduct')
  }
 
  const onClickEditProduct = (e) => {
    console.log(e)
    setShowModal(true)
    setProdId(e)
    // history.push('/editProduct')
    localStorage.setItem("id", e.target.value)
  }

  const deleteProduct = async (y) => {

    const response = await axios.delete(`${backend_url}/user/${y}`)
    return response.data
  }

  useEffect(() => {
    axios({
      url: `${backend_url}/user`,
      method: "get",
      headers: {
        "Content-type": "application/json"
      }
    }).then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, [])

  const onChangeUpdateProductName = (e) => {
    const value = e.target.value
    setProductName(value)
    setErorr('')
}
const onChangeUpdatePrice = (e) => {
  const value = e.target.value
  setPrice(value)
  setErorr('')
}
const onChangeUpdateStock = (e) => {
  const value = e.target.value
  setStock(value)
  setErorr('')
}
const UpdateStatus =  (x) => {
  x.preventDefault()
;
const data = {
product_name: product_name,
price: price,
stock: stock

}
console.log(data)
axios.put(`${backend_url}/product/${prod_id}`, data)
.then(result => {
    if (result.data.error) {
        console.log(result.data)
        // notifyErr()
    } else {
        if (result.data) {
            setProductName('')
            setPrice('')
            setStock('')
              ('')
            // setProvaProdId('')

        } 
        
    }
})
.catch((e) => {
    setErorr(e)
})

                    setTimeout(() => {
                        
                    }, 2500);
                   
                setShowModal(false)
                
}

  
    
    return (
      <div>


         //jika showEdit false, maka tampilkan product, jika true maka tampilkan edit form
          <div className="container w-full flex flex-wrap rounded-lg shadow py-5 mb-5 border-4 border-pink-500">
            <div className="flex flex-col w-full ">
              <div class="grid  grid-cols-4 gap-4 ml-5 items-center justify-between">
                <div className="  items-center ">
                  Nama Product
                </div>
                <div class=" relative mb-2 gap-4 mr-4 ">
                  <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2 gap-2">
                    <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current mr-3 ">
                      <path
                        d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                      </path>
                    </svg>
                  </span>
                  <input class="sm:text-sm appearance-none rounded-r rounded-l 
                            sm:rounded-l-none border border-gray-400 
                            border-b block pl-8 pr-6 py-2 w-full 
                            bg-white text-lg placeholder-gray-400 
                            text-gray-700 focus:bg-white 
                            focus:placeholder-gray-600 focus:text-gray-700 
                            focus:outline-none " placeholder="Search "
                            onChange={(event) => {
                              setSearch(event.target.value)
                            }} 
                   />
                </div>
                {console.log(search)}

                

              </div>
              

            </div>
            <div class="grid grid-cols-2 gap-4 ml-5 items-center flex sm:justify-items-end">
              <button onClick={onClickAddProduct} class="bg-primary hover:bg-blue-dark text-white font-bold py-2 px-4 rounded m-auto">
                Tambah Produk Baru
          </button>

            </div>







            <div className="w-full flex flex-wrap content-evenly">



              <table class="border-collapse w-full mr-10 ml-10 mt-5 ">
                <thead>
                  <tr>
                    <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">User Id</th>
                    <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Nama User</th>
                    <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Alamat</th>
                    <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Birth Day</th>
                    <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {User
                     .filter((val) => {
                       if (search == "") {
                         return val
                       } else if (val.product_name.toLowerCase().includes(search.toLocaleLowerCase())) {
                         return val
                       }
                      
                     })
                    .map((x) => {
                      
                      console.log(x)
                      return (
                       
                        <tr class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">User Id</span>

                            {x.id_user}
                          </td>
                          
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Nama User</span>
                            {x.username}
                            
                          </td>
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Alamat</span>
                            {x.address}
                          </td>
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Birth Day</span>
                            {x.bird_date}
                          </td>
                          
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                            <button class="text-blue-400 hover:text-blue-600 underline" value={x.prod_id} onClick={onClickEditProduct}>Edit</button>
                            <a href="" class="text-blue-400 hover:text-blue-600 underline pl-2" onClick={() => {
                              if (
                                window.confirm(
                                  "apakah anda yakin ingin menghapus data ini?"
                                )
                              ) {
                                deleteProduct(x.id_product)
                              }
                            }}>Hapus</a>
                          </td>
                        </tr>)
                    })}
                </tbody>
              </table>
            </div>
          </div>

        
      </div >
    )
}
export{User}