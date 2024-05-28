const prod = import.meta.env.MODE === "production";
const urlBase = prod ? location.origin : "http://coimbanc8150";
const endPoint = "WebApiSiamComunes/api";

export default `${urlBase}/${endPoint}`;

