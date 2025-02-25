interface CreateTaskDto {
    title: string
    description: string
    userId: number
    boardId: number
    statusId?: number
}

export default CreateTaskDto