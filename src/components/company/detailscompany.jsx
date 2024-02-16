import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import ModalRegisterCustomersForExcel from "../customer/modalRegisterExcel";
import {useDispatch, useSelector} from "react-redux";
import {addCustomersForExcel, updateUser} from "../../Store/UserSlice";
import {editCompany, selectCompanyById} from "../../Store/CompanySlice";
import api from "../../services/URLService";
const Modaleditcompany =({idCompanyE}) =>{
 console.log(idCompanyE)
  const  idc = idCompanyE
    const {idCompany}= useParams();
    const dispatch = useDispatch();
    const company = useSelector(selectCompanyById(idc));

    console.log(company)
    const [isOpen,setIsOpen]=useState(false);
    const  closeModal=async (isOpen) =>{
        if (isOpen === true ){
            return setIsOpen(false)
        }
        else if (isOpen === false){
          return   setIsOpen(true)
        }

    }



    const [formData, setFormData] = useState({
        nameCompany: "",
        descriptionCompany: "",
        user: "",
        phone: "",
        address: ""
    });


    useEffect(() => {
        if (company) {
            setFormData({
                idCompany:company.idCompany,
                nameCompany: company.nameCompany,
                descriptionCompany: company.descriptionCompany,
                phone: company.phone,
                address:company.address,
                stateCompany:company.stateCompany,
                codeValidation: company.codeValidation,
                user:company.user,
                active: company.active,
                dateCreation:company.dateCreation ,
                dateEndProcess: company.dateEndProcess,
                pathDocumentation: company.pathDocumentation
            });
        }
    }, [company]);




    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit =  (event) => {
            event.preventDefault();
            console.log(formData)

           console.log({companyData:formData});
             dispatch(editCompany({idCompany:idCompanyE,companyData:formData}));
        }






    // const input = document.querySelector("input");
    // const log = document.getElementById("log");
    //
    // input.addEventListener("change", updateValue);

    // function updateValue(e) {
    //     log.textContent = e.target.value;
    // }
    //


    //
    // const [nameCompany, setNames] = useState("");
    // const [descriptionCompany, setDescriptionCompany] = useState("");
    // const [idUser, setIdUser] = useState("");
    // const [documents, setDocuments] = useState("");
    // const [phone, setPhone] = useState("");
    // const [address, setAddress] = useState("");






    if (!company) {
        return <p>La compañía no existe</p>;
    }

    return (



        <div>

            <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" onClick={() => closeModal(isOpen)}
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">
                Edit
            </button>

            {

                isOpen && (
                    <div>
                        <div className="max-w-lg mx-auto">
                            <form
                                className={`grid grid-cols-2 gap-4 transition-opacity`}
                                onSubmit={handleSubmit}>
                                <input type="text"  value={formData.idCompany}   hidden={true}/>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input type="text" id="name" name="nameCompany" value={formData.nameCompany} onChange={handleChange}
                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="lastNames" className="block text-sm font-medium text-gray-700">Last
                                        Names</label>
                                    <input type="text" id="lastNames" name="descriptionCompany" value={formData.descriptionCompany}
                                           onChange={handleChange}
                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="number" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" id="email" name="user" value={formData.user.idUser}
                                           onChange={handleChange}
                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                </div>

                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="documentNumber" className="block text-sm font-medium text-gray-700">Document
                                        Number</label>
                                    <input type="number" id="documentNumber" name="phone"
                                           value={formData.phone} onChange={handleChange}
                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone
                                        Number</label>
                                    <input type="text" id="phoneNumber" name="address" value={formData.address}
                                           onChange={handleChange}
                                           className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
                                </div>

                                <div className="col-span-2">
                                    <Link to={"/companies"}>
                                        <button onClick={handleSubmit}
                                                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md">Cancel
                                        </button>
                                    </Link>
                                    <button type={"submit"}
                                            className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-md float-end">Save
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                )
            }
        </div>

    );
}
export default Modaleditcompany;