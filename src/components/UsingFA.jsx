import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {updateUser, userByEmail} from "../Store/UserSlice";
import {useDispatch, useSelector} from "react-redux";

const UsingFA= ()=>{

    const dispatch = useDispatch();
    const  user =  useSelector((state) => state.users_from_db.userLog);
    console.log(user+"este es el usuario en using")
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
    });

    // Verificar si el usuario está disponible antes de renderizar
    useEffect(() => {
        const token = localStorage.getItem('user')
        const  decodedToken = jwtDecode(token)
        const emailS = decodedToken.sub;
        console.log(emailS)
        const  email = localStorage.getItem("email")
        dispatch(userByEmail({email:emailS}))
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFormData({
                names: user.names,
                lastNames: user.lastNames,
                email: user.email,
                documentType: user.documentType,
                documentNumber: user.documentNumber,
                phoneNumber: user.phoneNumber,
                legal_person: user.legal_person,
                isUsing2FA: user.isUsing2FA,
                password: user.password,
                roles: user.roles.map(role => ({
                    idRole: role.idRole,
                    roleType: role.roleType
                }))
            });
        }
    }, [user]);

    const handleChange = (event) => {
        if (event.target.name === "isUsingFA") {
            formData.isUsing2FA(event.target.checked);
        }
        else {
            const {name, value} = event.target;
            setFormData({
                    ...formData,
                    [name]: value
                }
            );
        }
        console.log(formData);

    }
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(updateUser({id:user.idUser,userData:formData}));
    }

    console.log(user)

    const [enabled, setEnabled] = useState(user.isUsing2FA);
    console.log(enabled +"este es el estado")

      return (
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
          <div className="flex">
              <label className="inline-flex relative items-center mr-5 cursor-pointer">
                  <input
                      type="checkbox"
                      className="sr-only peer"
                      name="isUsingFA"
                      value={enabled}
                      checked={enabled}












                                           onChange={() => setEnabled(!enabled)}
                  />
                  <div
                      onClick={() => {
                          setEnabled(!enabled);
                      }}
                      className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                  ></div>
                  <span className="ml-2 text-sm font-medium text-gray-900">
                        ON
                    </span>
              </label>
          </div>
      </div>
      );

}
export default UsingFA;