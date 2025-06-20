import axios from "axios"

const getAllUsers = async () => {
    try {
        const data = await axios.get(`/api/user/`)
        return data.data.data
    } catch (error) {
        console.log(error)
    }
}

export {
    getAllUsers
}