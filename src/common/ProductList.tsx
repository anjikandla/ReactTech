import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { Audio } from 'react-loader-spinner';
import Rating from '@mui/material/Rating';
import smartphones from '../images/smartphones.jpg';
import laptops from '../images/laptops.jpg';
import groceries from '../images/groceries.jpg';
import skincare from '../images/skincare.jpg';
import fragrances from '../images/fragrances.jpg';
import homedecoration from '../images/homedecoration.jpg';
import all from '../images/all.jpeg';


const Products = () => {
    const [Alldata, setAllData] = useState<any[]>([]); // All products data
    const [data, setData] = useState<any[]>([]); // set filterd products data
    const [filterCat, setFilterCat] = useState(""); // set filter category sting
    const [category, setcategory] = useState<any[]>([]); // Get all products category list
    const [isLoading, setLoading] = useState(true);
    const [modalShow, setModalShow] = useState(false);
    const [productDetail, setProductDetail] = useState<any[]>([]);
    const [rating, setRating] = useState<number | null>();
    const [productHeroImg,setProductHeroImg] = useState();

    const productList = async () => {
        const response = await axios.get('https://dummyjson.com/products');
        //const response = await axios.get('https://fakestoreapi.com/products');
        //console.log(response.data.products);
        setData(response.data.products);
        setAllData(response.data.products);
        setLoading(false)

    }
    const categoryList = () => {
        const result = data.map((item) => {
            return item.category;
        })
        const catList = result.filter((item, pos) => {
            return result.indexOf(item) == pos;
        })
        setcategory(catList);
    }
    const categoryFilterFn = (val: any) => () => {
        if (val === "all") {
            setData(Alldata);
            setFilterCat(val);
        } else {
            //console.log(val)
            setFilterCat(val)
            let respCategory = Alldata.filter((item) => item.category.includes(val))
            // console.log(respCategory);
            setData(respCategory);

        }
    }
    // const getImagePath = (img: any) => {
    //     return `file:///D:/projects/React/ReactTech/src/images/${img}.jpg`
    // }
    const details = (val: any) => () => {
        console.log("ID:", val)
        let product = Alldata.filter((data: { id: string }) => {
            return data.id === val;
        })
        //let productObj = Object.assign({}, ...product);
        console.log("ProductDetails:", product);
        setProductDetail(product);
        setModalShow(true);
    }
    useEffect(() => {
        productList();
        categoryList();
    }, [])


    return (
        <>

            <div className="d-flex align-items-center catList p-3 py-4">
                {/* {category && (category.map((item)=>(
                    <div className="">
                        <img src={require(getImagePath(item))}/>
                        <div>{item.replace("-"," ")}</div>
                    </div>
                )))} */}
                <div className={`${filterCat === "all" ? 'selected' : ''}`} onClick={categoryFilterFn("all")}>
                    <img src={all} />
                    <div>All Products</div>
                </div>
                <div className={`${filterCat === "laptops" ? 'selected' : ''}`} onClick={categoryFilterFn("laptops")}>
                    <img src={laptops} />
                    <div>Laptops</div>
                </div>
                <div className={`${filterCat === "smartphones" ? 'selected' : ''}`} onClick={categoryFilterFn("smartphones")}>
                    <img src={smartphones} />
                    <div>Smartphone</div>
                </div>

                <div className={`${filterCat === "fragrances" ? 'selected' : ''}`} onClick={categoryFilterFn("fragrances")}>
                    <img src={fragrances} />
                    <div>Fragrances</div>
                </div>
                <div className={`${filterCat === "groceries" ? 'selected' : ''}`} onClick={categoryFilterFn("groceries")}>
                    <img src={groceries} />
                    <div>Groceries</div>
                </div>
                <div className={`${filterCat === "home-decoration" ? 'selected' : ''}`} onClick={categoryFilterFn("home-decoration")}>
                    <img src={homedecoration} />
                    <div>home Decoration</div>
                </div>
                <div className={`${filterCat === "skincare" ? 'selected' : ''}`} onClick={categoryFilterFn("skincare")}>
                    <img src={skincare} />
                    <div>Skincare</div>
                </div>
            </div>
            <div className="container">
                {isLoading ? (<><Audio /></>) : (
                    <>
                        {/* <span>Loaded</span> */}
                        <div className="row productBox p-3">
                            {data && (
                                data.map((item) => (
                                    <div className="col-md-3 pb-3">
                                        <div className="card">
                                            {/* {item.category} */}
                                            <img id={item.id} src={item.thumbnail} style={{cursor:"pointer"}} onClick={details(item.id)} />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>)
                }
            </div>
            {modalShow && <div className={`modal modal-lg ${modalShow ? 'd-block' : 'd-none'}`} id="exampleModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header border-0">
                            {/* <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1> */}
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => {setModalShow(false);setProductHeroImg(undefined)}}></button>
                        </div>
                        <div className="modal-body">
                            {productDetail && (
                                
                                productDetail.map((details) => (
                                    <div className="row productDetail">
                                        <div className="col-md-5">
                                            <div className="productImg">
                                                <img src={`${!productHeroImg ? details.images[0]:productHeroImg}`} />
                                            </div>
                                            <div className="d-flex align-items-center">
                                                {details.images.map((img:any)=>(
                                                    <div className="border p-2 m-2">
                                                        {<img src={img} style={{cursor:"pointer"}} onClick={()=>{setProductHeroImg(img)}} />}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="productInfo">
                                                <div className="title h4">{details.brand} {details.title}</div>
                                                <div className="price text-danger h3">Price: ${details.price}</div>
                                                <div className="discount border text-bg-light p-2 d-inline-flex align-items-center"><div className="badge text-bg-danger me-1">Deal</div> Discount Price: ${details.discountPercentage}</div><br/>
                                                <div className="border-top d-block mt-3 pt-1">
                                                    <div className="d-block">Items in stock: {details.stock}</div>
                                                    <div className="rating pt-2">
                                                        <Rating name="read-only" value={details.rating} readOnly />
                                                    </div>
                                                </div>
                                                <div className="border-top pt-1">
                                                    {details.description}
                                                </div>

                                            </div>
                                        </div>
                                    </div>)))
                            }
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Products;