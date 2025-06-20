import axios from "axios"

const getAllUsers = async () => {
    try {
        const data = await axios.get(`https://test-task-backend-bqk9.onrender.com/api/user/`)
        return data.data.data
    } catch (error) {
        console.log(error)
    }
}

export {
    getAllUsers
}