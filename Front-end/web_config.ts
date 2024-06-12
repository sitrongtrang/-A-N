const is_deploy = false
const fe_url: string = !is_deploy ? "http://localhost:3000" : ""
const localhost_be = "http://localhost:8000"
const be_url: string = localhost_be // "https://yolohomiebe.onrender.com"
export {fe_url, be_url}