import React, {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {updateUser, userByEmail, veryfyCode} from "../Store/UserSlice";
import {useDispatch, useSelector} from "react-redux";
import QRCode from "./employee/QRcode";

const UsingFA= ()=>{
    const dispatch = useDispatch();
    const  text1= "enable"
    const  text2 = "disabled"
    const   user = useSelector(state => state.users_from_db.userLog)
    const [isFA,setIsFA]=useState(user.using2FA);

    const  [renderQR,setRenderQR ]= useState(false)
    const [iState , setIState] = useState(user.using2FA)

    const [formData, setFormData] = useState({
        names: user.names,
        lastNames: user.lastNames,
        email: user.email,
        documentType: user.documentType,
        documentNumber: user.documentNumber,
        phoneNumber: user.phoneNumber,
        legal_person: user.legal_person,
        using2FA:isFA,
        password: user.password,
        roles: user.roles.map(role => ({
            idRole: role.idRole,
            roleType: role.roleType
        }))
    });

    const [codeValidation,setCodeValidation] = useState(null)



    useEffect(() => {
        // Aquí puedes actualizar formData con el nuevo valor de isFA
        setFormData(prevFormData => ({
            ...prevFormData,
            using2FA: isFA
        }));
    }, [isFA]);
    console.log(" >>>>>>")
    console.log(user)
    console.log(" >>>>>>")
let i = 1
    console.log(isFA)
    console.log(i++)


    const handleSetFalse = () => {
        setIsFA(prevIsFA => false); // Invertir el valor de is

 handleRenderButton()
    };
    const handleSetTrue = () => {
        setIsFA(prevIsFA => true); // Invertir el valor de is
        handleRenderQR()
    };
    const  handleRenderQR=() =>{
        setRenderQR(prevState => !prevState )
    }
    const mostrar=()=>{
        console.log("00000")
        console.log(formData.using2FA)
        console.log("00000")
        enable2FA()
console.log(formData)
    }

 const  [button ,setButton] = useState(false)

    const  handleRenderButton = () =>{
        setButton(prevState => !prevState)
    }


// const change  = () => {
//         try {
//            handleSetFalse()
//
//
//         }  catch (e ){
//
//
//
//         }
//
//
//
// }
    const  disable2FA  = async ()=>{
  try {
      dispatch(updateUser({id: user.idUser, userData: formData}));
  }catch (e) {
      throw  e}
    }

    const enable2FA = async ()=>{
    try {
        console.log(formData)
        const validateCodeDTO = {
            email: user.email,
            code: codeValidation
        }
        console.log("esto es el validateDTO")
        console.log(validateCodeDTO)
         const  response  = await dispatch(veryfyCode({validateDTO: validateCodeDTO}))
      console.log(response.payload.valid)
        if (response.payload.valid === true) {
            dispatch(updateUser({id: user.idUser, userData: formData}));
           console.log("estoy en el condicional")
        }
    }catch (e) {
        throw  e
    }
    }




    return (
        <div>

            <div className="col-span-5">
                <div className="p-4 lg:p-12 bg-gray-100 mb-10">
                    {/* TITLE */}
                    <div>
                        <h1 className={`text-3xl font-bold transition-opacity `}>Is Using 2FA
                            state: {iState ? text1 : text2}</h1>
                    </div>
                </div>

                <div  className={"flex justify-center"}>
                    {
                        iState ===true && (
                            <button type="button" onClick={handleSetFalse} name={"isUsingFA"}
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                <div>
                                    Disable
                                </div>
                            </button>
                        )
                    }

                    {
                        iState===false && (

                            <div>
                                <div className={"flex flex-col justify-center"}>

                                    <button type="button" onClick={handleSetTrue} name={"isUsingFA"}
                                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                                                        <div>
                                                            Enable
                                                        </div>
                                    </button>
                                </div>
                            </div>


                        )
                    }
            </div>
                {
                    renderQR &&(
                        <div className={"flex flex-col justify-center"}>
                            < div className={"flex justify-center"}><QRCode email={user.email}></QRCode></div>
                            <div>
                                <form>
                                    <div>
                                        <label className={" flex justify-center"}><h5 className={"font-sans"}> Code G
                                            AUTH </h5></label>
                                    </div>
                                    <div className={"flex justify-center"}>
                                        <input type={"number"} name="code"  onChange={(e)=>setCodeValidation(e.target.value)}
                                               className={"mb-3  border-2 rounded-lg p-2 w-48 text-black focus:border-blue-500 focus:shadow-lg appearance-none"}/>
                                    </div>

                                    <div className={"flex flex-col "}>
                                        <div className={"flex  justify-center "}>
                                            <button type={"button"} onClick={() => mostrar()}
                                                    className="flex flex-col text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Update
                                            </button>
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                    )

                }
                {
                  button &&(
                    <div className={"flex flex-col "}>
                        <div className={"flex  justify-center "}>
                            <button type={"button"} onClick={() => disable2FA()}
                                    className="flex flex-col text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Update
                            </button>
                        </div>
                    </div>
                    )

                }

            </div>
        </div>
    );
}
export default UsingFA;