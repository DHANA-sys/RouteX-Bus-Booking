import api from "./api"


export const registerUser = (userData) => {
    return api.post("/register", userData)
};


export const loginUser = (userData) => {
    return api.post("/login", userData);
};

export const searchBus=(fromCity,toCity)=>{
    return api.get("/buses/search",{
        params:{
            fromCity:fromCity,
            toCity:toCity
        }
    })
}

export const getAllSeats = () => {
    return api.get("/seats");
};

export const getAllBuses=()=>{
    return api.get("/buses");
}


export const getAllActiveOffers=()=>{
    return api.get("/offers");
}

export const getOfferByCouponCode=()=>{
    return api.get(`/offers/coupon/${couponCode}`);
}


// export const getSeatsByBusId = (busId) => {
//     return api.get(`/seats/bus/${busId}`);
// };