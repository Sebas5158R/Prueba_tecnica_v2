import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../services/URLService";

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        try {
            const response = await api.get('/user/listUsers', {
            
            });
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);

export const addUser = createAsyncThunk(
    'users/addUsers',
    async (userData) => {
        try {
            console.log(userData)
            const response = await api.post('/user/addUser', userData);
            console.log(response.data)
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const addCustomersForExcel = createAsyncThunk(
    'customers/addCustomersForExcel',
    async (file) => {
        try {
            const response = await api.post('/user/uploadUsersData', file);
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({id, userData}) => {
        try {
            console.log("ID " + id)
            const response = await api.put(`/user/updateUser/${id}`, userData);
            console.log(userData + "userData");
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);

export const userById = createAsyncThunk(
    'user/userById',
    async (idUser) => {
        try {
            const response = await api.get(`/user/listUser/${idUser}`);
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);



export const userByEmail  = createAsyncThunk(
    'user/userByEmail',
    async ({email}) => {
        try {
            console.log(email+"user by email")
            const response = await api.get(`/user/findByEmail/${email}`);
            console.log(response.data)
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);


export const  veryfyCode = createAsyncThunk (
    'code/validate',
    async  ({validateDTO}) =>{
     try {
         console.log("validate Dto")
         console.log(validateDTO)
         const  response = await api.post('/code/validate/key',validateDTO)
         console.log("this is response")
         console.log(response.data)
         return response.data;
     } catch (error){
         throw  error;
     }
    }
);



        export const forgotPassword = createAsyncThunk(
    'user/forgotPassword',
    async({email, data}) => {
        try {
            const response = await api.post(`/user/forgotPassword?email=${email}`, data);
            console.log("Email:"+email)
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);

export const verifyTokenResetPassword = createAsyncThunk(
    'user/verifyTokenResetPassword',
    async(token) => {
        try {
            const response = await api.get(`/user/getResetPassword?token=${token}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const resetPassword = createAsyncThunk(
    'user/resetPassword',
    async({token, newPassword}) => {
        try {
            const response = await api.put(`/user/resetPassword?token=${token}&newPassword=${newPassword}`);
            return response.data;
        } catch(error) {
            throw error;
        }
    }
);

const userSlice = createSlice({
    name: "users",
    initialState: {
        loading: false,
        users: [],
        employees: [],
        customers: [],
        userLog:null,
        userToEdit: null,
        emailFromToken: null,
        msg: null,
        error: null
    },
    reducers: {
        clearMessage: (state) => {
            state.error = null;
            state.msg = null;
        }
    },
    extraReducers: (builder) => {
        builder
        // Redux list Users
        .addCase(fetchUsers.fulfilled, (state, action) => {
            action.payload.forEach(user => {
                const isSuperAdmin = user.roles.some(role => role.roleType === 'SUPER_ADMINISTRADOR' || role.roleType === 'ADMINISTRADOR' || role.roleType === 'EMPLEADO');
                const isClient = user.roles.some(role => role.roleType === 'CLIENTE');
                const isAlreadyAdded = state.employees.some(emp => emp.idUser === user.idUser);
                const isAlreadyAddedClient = state.customers.some(cli => cli.idUser === user.idUser);
                if (isSuperAdmin && !isAlreadyAdded) {
                    state.employees.push(user);
                } else if (isClient && !isAlreadyAddedClient) {
                    state.customers.push(user);
                }
            });
            state.error = null;
        })
        
        .addCase(fetchUsers.rejected, (state, action) => {
            state.users = [];
            state.employees = [];
            state.customers = [];
            console.log(action.error.message);
            if(action.error.message === 'Request failed with status code 500') {
                state.error = 'Access Denied';
            } else {
                state.error = action.error.message;
            }
        })


            .addCase(userByEmail.fulfilled,(state ,action)=>{
                state.userLog = action.payload;
                state.error = null
            })
            .addCase(userByEmail.rejected,(state  , action)=>{
                 state.error=  "Algo anda mal"
                 console.log(action.error.message)
            })


        // Redux add User
        .addCase(addUser.pending, (state) => {
            state.loading = true;
            state.msg = null;
            state.error = null;
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.loading = false
            state.msg = action.payload;
            state.error = null;
            setTimeout( function() { window.location.reload(); }, 2000 );
        })
        .addCase(addUser.rejected, (state, action) => {
            state.loading = false;
            state.msg = null;
            console.log(action.error.message);
            if(action.error.message === "Request failed with status code 400") {
                state.error = 'There is already a registered user with that email';
            } else if(action.error.message === "Network Error") {
                state.error = 'There is already a registered user with document or telephone number';
            }
             else {
                state.error = action.error.message;
            }
        })


        // Redux add with Excel
        .addCase(addCustomersForExcel.pending, (state) => {
            state.loading = true;
            state.msg = null;
            state.error = null;
        })
        .addCase(addCustomersForExcel.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload;
            state.error = null;
            setTimeout( function() { window.location.reload(); }, 2000 );
        })
        .addCase(addCustomersForExcel.rejected, (state, action) => {
            state.loading = false;
            state.msg = null;
            console.log(action.error.message);
            if (action.error.message === 'Network Error') {
                state.error = 'User with duplicate data, cannot be imported.';
            } else {
                state.error = action.error.message;
            }
        })


        // Redux Update users
        .addCase(updateUser.fulfilled, (state, action) => {
            state.users = action.payload;
            state.error = null;
            window.alert("Usuario editado exitosamente");
            window.location.replace("/employees");
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.users = [];
            console.log(action.error.message);
        })


        // Redux get data by id of user
        .addCase(userById.fulfilled, (state, action) => {
            state.userToEdit = action.payload;
            state.error = null;
        })


        // Redux case for forgot password
        .addCase(forgotPassword.pending, (state) => {
            state.loading = true;
            state.msg = null;
            state.error = null;
        })
        .addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload;
            state.error = null;
        })
        .addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.msg = null;
            console.log(action.error.message);
            if(action.error.message === "Request failed with status code 400") {
                state.error = 'El correo electrónico ingresado no está afiliado a ningún usuario.';
            } else {
                state.error = action.error.message;
            }
        })


        // Redux verify token for reset password
        .addCase(verifyTokenResetPassword.fulfilled, (state, action) => {
            state.emailFromToken = action.payload;
            state.error = null;
        })
        .addCase(verifyTokenResetPassword.rejected, (state, action) => {
            state.emailFromToken = null;
            state.error = action.error.message;
        })

        .addCase(resetPassword.pending, (state) => {
            state.loading = true;
            state.msg = null;
            state.error = null;
        })

        .addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload;
            state.error = null;
            setTimeout( function() { window.location.href = "http://localhost:3000/"; }, 5000 );
        })

        .addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.msg = null;
            console.log(action.error.message);
        })


    }

});

export const { clearMessage } = userSlice.actions;
export default userSlice.reducer;