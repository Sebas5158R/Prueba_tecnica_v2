import React, {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {updateUser, userByEmail} from "../Store/UserSlice";
import {useDispatch, useSelector} from "react-redux";

const UsingFA= ()=>{
    const dispatch = useDispatch();
    const  text1= "enable"
    const  text2 = "disabled"
    const   user = useSelector(state => state.users_from_db.userLog)
    const [isFA,setIsFA]=useState(user.using2FA);



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

    // const handleedit = (z) =>{
    //     // console.log(z)
    //     console.log("========")
    //     console.log("en formulariooo")
    //     setFormData({using2FA: z})
    //     console.log(formData.using2FA)
    //     console.log("en formulariooo")
    //     console.log("0000000")
    //     console.log("0000000")
    //     console.log("===========")
    // }



    const handleActivate = () => {
        setIsFA(prevIsFA => !prevIsFA); // Invertir el valor de is

    };

    const handleSetFalse = () => {
        setIsFA(prevIsFA => false); // Invertir el valor de is
    };
    const handleSetTrue = () => {
        setIsFA(prevIsFA => true); // Invertir el valor de is
    };
    const mostrar=()=>{
        console.log("00000")
        console.log(formData.using2FA)
        console.log("00000")
console.log(formData)
        envio()
    }

    const envio =()=>{
        console.log(formData)
        dispatch(updateUser({id:user.idUser,userData:formData}));
    }

    return (
        <div>

            <div className="col-span-5">
                <div className="p-4 lg:p-12 bg-gray-100 mb-10">
                    {/* TITLE */}
                    <div>
                        <h1 className={`text-3xl font-bold transition-opacity `}>Is Using 2FA
                            state: {isFA ? text1 : text2}</h1>
                    </div>
                </div>



                <div  className={"flex justify-center"}>

                <button type="button" onClick={handleSetTrue} name={"isUsingFA"}
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ">
                    <div>
                        Enable
                    </div>
                </button>

                <button type="button" onClick={handleSetFalse} name={"isUsingFA"}
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                    <div>
                        Disable
                    </div>
                </button>
            </div>
   <div className={"flex justify-center "}>
                <button type={"button"} onClick={() => mostrar()}
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> Update
                </button>
      </div>
    </div>
        </div>
    );
}
export default UsingFA;