import axios from "axios";

const getProduct = async (barcode) => {
    try {
        const response = await axios.get(`http://localhost:5000/products/${barcode}`)

        return response.data.product;
    } catch (error) {
        if (error.response?.status === 404) {
            throw new Error("Product not found in our database. Try demo mode to see how it works.", { cause: error })
        }
        if (error.response?.status === 500){
            throw new Error("Server error. Please try again later", { cause: error })
        }
        if (error.code === "ERR_NETWORK") {
            throw new Error("Cannot connect to server. Check your internet connection", { cause: error })
        }
        throw new Error("Something went wrong", { cause: error })
    }
}

export default getProduct;