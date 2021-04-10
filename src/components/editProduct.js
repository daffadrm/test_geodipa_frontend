import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { backend_url } from '../backend-config'


export default function EditProduct(props) {
    const history = useHistory()
    const [Product, setProduct] = useState([])
    const [product_name, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [erorr, setError] = useState('');
    const [alert, setAlert] = useState('');
    const id = localStorage.getItem("id")
    
    const onChangeProductName = (e) => {
        const value = e.target.value
        setProductName(value)
        setError('')
    }
    const onChangePrice = (e) => {
        const value = e.target.value
        setPrice(value)
        setError('')
    }
    const onChangeStock = (e) => {
        const value = e.target.value
        setStock(value)
        setError('')
    }
    const GetProduct = async () => {
        const response = await axios.get(`${backend_url}/product/${id}`);
        return response.data
    };

    useEffect(() => {
        const getListProduct = async () => {
            const listProduct = await GetProduct();
            console.log(listProduct);
            if (listProduct) {
                
                setProductName(listProduct[0].product_name);
                setPrice(listProduct[0].price);
                setStock(listProduct[0].stock);
                
                

            }
        };
        getListProduct();
        console.log(Product);

    }, []);
    useEffect(() => {}, [Product]);



    const updateProduct = (e) => {
        console.log(e)
        e.preventDefault()
        const data = {
            product_name: product_name,
            price: Number(price),
            stock: Number(stock),
        
        };
        console.log(data);
        axios
            .put(`${backend_url}/product/${id}`, data)
            .then(result => {
                console.log(result)
                if (result.data.error) {  
                    // console.log(result.data);
                    console.log(result.data)
                        //notifyErr()

                    }else{
                        console.log(result.data)
                    if (result.data) {
                        setProductName('')
                        setPrice('')
                        setStock('')
                        setAlert(result.data.message);
                        setTimeout(() => {
                            setAlert("");
                        }, 2500);
                    }
                    //notify()
                    props.setShowEdit(false)
                }
            })
            .catch((e) => {
                setError(e.response.message);
            });
    };

    return (
        <div>
            <div className="flex flex-wrap rounded-lg shadow border-4 border-pink-500">

                <form className="w-full flex flex-wrap content-evenly" onSubmit={updateProduct}>
                    <div className="w-full">
                        <h1 class="flex-auto text-xl font-bold dark:text-gray-50 ml-5">
                            Edit produk
                            </h1>
                    </div>
                    <div className="w-full ml-5 text-xs mb-10">
                        Edit produk yang tepat untuk produkmu
                </div>
                    <div className="w-4/12 ml-5 text-base">
                        Nama Produk
                </div>
                    <div className="w-6/12 ">
                        <div class=" relative ">
                            <input type="text" id="prod_name" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
                                placeholder="Mohon masukkan nama produk"
                                value={product_name}
                                onChange={onChangeProductName} />
                        </div>
                    </div>
                    <div className="w-4/12 ml-5 text-base">
                        Harga Produk
                </div>
                    <div className="w-6/12">

                    <div class=" relative ">
                            <input type="number" id="prod_name" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
                                placeholder="Mohon masukkan harga produk"
                                value={price}
                                onChange={onChangePrice} />
                        </div>

                    </div>
                    <div className="w-4/12 ml-5 text-base">
                        Stock
                </div>
                    <div className="w-6/12 ">
                        <div class=" relative ">
                            <input type="number" id="prod_name" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
                                placeholder="Mohon masukkan stock produk"
                                value={stock}
                                onChange={onChangeStock} />
                        </div>
                    </div>
                    
                    <div className="w-2/4 grid justify-items-end">
                        <button class="bg-primary hover:bg-blue-dark text-black font-bold py-2 px-4 rounded m-auto underline"
                            onClick={()=>{props.setShowEdit(false)}}> Batal
</button>
                    </div>

                    <div className="w-2/4 grid justify-items-end">
                        <button type="submit" class="bg-primary hover:bg-blue-dark text-black font-bold py-2 px-4 rounded m-auto underline" values="updateProduct"> Simpan </button>
                    </div>
                </form>
            </div>

        </div>
    )

}