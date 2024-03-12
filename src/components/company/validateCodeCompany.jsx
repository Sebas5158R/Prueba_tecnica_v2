import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchComapanies, validateCodeCompany} from "../../Store/CompanySlice";

const  FormValidateCompany =()=> {

    const dispatch = useDispatch();
    const company = useSelector(state => state.company.companies)
    console.log(company)
    useEffect(() => {
        dispatch(fetchComapanies());
    }, [dispatch]);


    //
    // const resultado = company.reduce((acumulador, companyD) => {
    //
    //     if (companyD.active===false) {
    //         // Si el elemento cumple con la condición, lo transformamos y lo agregamos al acumulador
    //         acumulador.push({ company: companyD.idCompany, nombre: companyD.nameCompany });
    //     }
    //     console.log(acumulador)
    //     return acumulador;
    // }, []);


    // const  cpni  =  company.map

    const companyDisable = company.filter(compania => !compania.active);
   const [code,setCode] = useState();
   const [companyOption , setCompanyOption] = useState("")


    const  handleSubmit  = () =>{
      const  validateCodeDTO = {
          companyOption,
          code
      }

       dispatch(validateCodeCompany(validateCodeDTO))
    }

  const handleCode  = (event) => {
      setCode(event.target.value)
      console.log(code)
  }
  const  handleCompanyOption  = (event)=>{
       setCompanyOption(event.target.value)
      console.log(companyOption)
  }


    return (
        <div>
            {



        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">

                <h1 className="text-2xl font-semibold text-center text-gray-500 mt-8 mb-6">Creation Authorization</h1>
                <p className="text-sm text-gray-600 text-center mt-8 mb-6">Enter the code generated and Sent to email</p>
                <form className={"max-w-sm mx-auto"}>

                    <select id="countries"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            name={"companyOption"} onChange={handleCompanyOption}>
                        <option selected>Choose a company</option>
                        {companyDisable.map((compania, index) => (


                            <option key={index} value={compania.idCompany}>
                                {compania.nameCompany}
                            </option>

                        ))
                        }
                    </select>

                    <br />

                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm text-gray-600">Code</label>
                        <input type="number" id="number" name="code" onChange={handleCode}
                               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                               required/>
                    </div>
                    <button type="button" onClick={handleSubmit}
                            className="w-32 bg-gradient-to-r from-blue-400 to-blue-600 text-white py-2 rounded-lg mx-auto block focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 mt-4 mb-4">validate
                    </button>
                </form>
                <div className="text-center">
                    <p className="text-sm">Volver a <Link to={"/companies"} className="text-blue-600 hover:underline">module companies</Link></p>
                </div>
                <p className="text-xs text-gray-600 text-center mt-8">&copy; 2024 Business solutions</p>
            </div>
        </div>
            }
        </div>
            )


}
export default FormValidateCompany;