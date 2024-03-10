let GET_BASE_URL = () => {
    let fullUrl = window.location.href;

    let splittedUrl = fullUrl.split("/");
    return splittedUrl[0]+"//"+splittedUrl[2]
}

let BASE_URL = GET_BASE_URL();
// let BASE_URL = "http://localhost:4200"




export { BASE_URL }