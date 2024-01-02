/* eslint-disable no-undef */
import axios from 'axios';
import { setUser } from "../pages/registration-login/userSlice";

const Base_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/api/v1";

const axiosProcessor = async ({ method, url = {}, body, isPrivate = false, withRefreshToken = false }) => {
    const headers = {
        Authorization: isPrivate ? (withRefreshToken ? localStorage.getItem("refreshJWT") : localStorage.getItem("accessToken")) : ""
    }
    try {
        const data = await axios({
            method: method,
            url,
            data: body,
            headers
        })
        return data;
    } catch (error) {
        if (error?.response?.data?.message === "Jwt expired") {
            const { status, accessJWT } = await apiGetNewAcessToken()
            if (status === "success") {
                localStorage.setItem("accessJWT", accessJWT);
            }
            return axiosProcessor({ method, url, body, isPrivate, withRefreshToken })
        }
        return {
            status: error,
            message: error.message
        }
    }
}

export const apiGetNewAcessToken = () => {
    return axiosProcessor({
        method: "get",
        url: `${Base_URL}/admin/get-acessjwt`,
        withRefreshToken: true,
        isPrivate: true
    })
}
export const apiRegisterUser = (data) => {
    return axiosProcessor({
        method: "post",
        body: data,
        url: `${Base_URL}/admin/registration`,
    })
}
export const loginUser = (data) => {
    // post axios
    return axiosProcessor({
        method: "post",
        body: data,
        url: `${Base_URL}/admin/login`,
    })
}
export const apiLogoutUser = async() => {
   const accessJWT = localStorage.getItem("accessJWT");
   const refreshJWT = localStorage.getItem("refreshJWT");

   sessionStorage.removeItem("accessJWT");
   sessionStorage.removeItem("refreshJWT");
   await axiosProcessor({
    method: "post",
    body: {
        "accessJWT": accessJWT,
        "refreshJWT": refreshJWT
    },
    url: `${Base_URL}/admin/logout`
   })
   dispatch(setUser({}));
}
export const apiGetAdminInfo = () => {
    return axiosProcessor({
        method: "get", 
        url: `${Base_URL}/admin`,
        isPrivate: true  
    })

}
export const verifyUser = (data) => {
    return axiosProcessor({
        method: "post", 
        url: `${Base_URL}/admin/account-verification`,
        body: data
    })
}
export const apiGetCategories = () => {
    return axiosProcessor({
        method: "get",
        url: `${Base_URL}/category`,
        isPrivate: true
    })

}
export const apiCreateCategory = (data) => {
    return axiosProcessor({
        method: "post",
        body: data,
        url: `${Base_URL}/category`,
        isPrivate: true
    })
}
export const apiUpdateCategoryAction = (id, update) => {
    return axiosProcessor({
        method: "put",
        body: data,
        url: `${Base_URL}/category/${id}`,
        isPrivate: true
    })
}