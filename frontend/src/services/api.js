import axios from "axios";

const getProduct = async (barcode) => {
    try {
        const response = await axios.get(`http://localhost:5000/products/${barcode}`)

        return response.data;
    } catch (error) {
        if (error.response?.status === 404) {
            throw new Error("Product not found", { cause: error })
        }
        if (error.response?.status === 500){
            throw new Error("Server error, try again later", { cause: error })
        }
        if (error.code === "ERR_NETWORK") {
            throw new Error("Cannot connect to server", { cause: error })
        }
        throw new Error("Something went wrong", { cause: error })
    }
}

export default getProduct;