import axios from 'axios'

const getAllBoards = async () => {
    try {
        const data = await axios.get("/api/board/")
        return data.data.data
    } catch (error) {
        
    }
}

const createBoard = async (name) => {
    try {
        const data = await axios.post("/api/board/", {
            name: name
        })
        return data.data.data
    } catch (error) {
        
    }
}

const deleteBoard = async (id) => {
    try {
        const data = await axios.delete(`/api/board/${id}`)
        return data.data.data
    } catch (error) {
        
    }
}

export {
    getAllBoards,
    createBoard,
    deleteBoard
}