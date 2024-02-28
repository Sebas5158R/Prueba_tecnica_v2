import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {updateUser, userByEmail} from "../Store/UserSlice";
import {useDispatch, useSelector} from "react-redux";

const UsingFA= ()=>{

    const dispatch = useDispatch();
    const  user =  useSelector((state) => state.users_from_db.userLog);
   console.log(user.using2FA)
    const [formData, setFormData] = useState({
        names:"",
        lastNames: "",
        email: "",
        documentType: "",
        documentNumber: "",
        phoneNumber: "",
        legal_person: "",
        isUsing2FA:"",
        password: "",
        roles: [
            {
                idRole: "",
                roleType: ""
            }
        ]
    });useEffect(() => {
        if (user) {
            setFormData({
                names: user.names,
                lastNames: user.lastNames,
                email: user.email,
                documentType: user.documentType,
                documentNumber: user.documentNumber,
                phoneNumber: user.phoneNumber,
                legal_person: user.legal_person,
                isUsing2FA:isFA,
                password: user.password,
                roles: user.roles.map(role => ({
                    idRole: role.idRole,
                    roleType: role.roleType
                }))
            });
        }
    }, [user]);

    // Verificar si el usuario está disponible antes de renderizar
    useEffect(() => {
        const token = localStorage.getItem('user')
        const  decodedToken = jwtDecode(token)
        const emailS = decodedToken.sub;
        console.log(emailS)
        const  email = localStorage.getItem("email")
        dispatch(userByEmail({email:emailS}))
    }, [dispatch]);

    const   [isFA,setisFA] = useState(user.using2FA)


    const handleChange = (event) => {
            const {name, value} = event.target;
            setFormData({
                    ...formData,
                    [name]: value
                }
            );
    }

    const  handleFA=()=>{
        console.log(isFA)
        setisFA(!isFA)

    }


   const  handleFA1 =() =>{
        handleFA()
        console.log("++++++++++++++")
    console.log(isFA)
        console.log("++++++++++++++")

       console.log("000000000000")
       console.log(isFA)
       console.log("000000000000")

        console.log(isFA+ "esto es el using")
        setFormData({names: user.names,
            lastNames: user.lastNames,
            email: user.email,
            documentType: user.documentType,
            documentNumber: user.documentNumber,
            phoneNumber: user.phoneNumber,
            legal_person: user.legal_person,
            isUsing2FA:isFA,
            password: user.password,
            roles: user.roles.map(role => ({
                idRole: role.idRole,
                roleType: role.roleType
            }))})
        console.log("2222222")
     console.log(formData)
       console.log(formData.isUsing2FA)
        console.log("2222222")

    };

const envio = ()=>{
    dispatch(updateUser({id:user.idUser,userData:formData}));
}

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser({id:user.idUser,userData:formData}));
    }
    console.log(user)


      return (
        <div>
            <form>
                <button type="button"    onClick={handleFA1}    name={"isUsingFA"} onChange={handleChange}
                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "> $
                </button>
            </form>
        </div>
      );

}
export default UsingFA;