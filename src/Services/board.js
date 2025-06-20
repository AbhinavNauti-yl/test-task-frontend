import axios from 'axios'

const getAllBoards = async () => {
    try {
        const data = await axios.get("https://test-task-backend-bqk9.onrender.com/api/board/")
        return data.data.data
    } catch (error) {
        
    }
}

const createBoard = async (name) => {
    try {
        const data = await axios.post("https://test-task-backend-bqk9.onrender.com/api/board/", {
            name: name
        })
        return data.data.data
    } catch (error) {
        
    }
}

const deleteBoard = async (id) => {
    try {
        const data = await axios.delete(`https://test-task-backend-bqk9.onrender.com/api/board/${id}`)
        return data.data.data
    } catch (error) {
        
    }
}

export {
    getAllBoards,
    createBoard,
    deleteBoard
}