const Task = require('../models/task');
const { trace } = require('../routes/tasks');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ tasks:tasks });
    } catch (error) {
        res.status(500).json({ msg:error });
    }
};

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({ task });
    } catch (error) {
        res.status(500).json({ msg:error });
    }
    
}

const getTask = async (req, res) => {
    try {
        const {id:TaskID} = req.params;
        const task = await Task.findOne({_id: TaskID});

        if (!task){
            return res.status(404).json({msg: `no task with id : ${TaskID}`})
        }

        res.status(200).json({ task });

    } catch (error) {
        res.status(500).json({ msg:error });
    }
};

const updateTask = async (req, res) => {
    try {
        const {id:TaskID} = req.params;
        const task = await Task.findOneAndUpdate({_id: TaskID}, req.body, {
            new: true,
            runValidators: true
        });

        if (!task){
            return res.status(404).json({msg: `no task with id : ${TaskID}`})
        }

        res.status(200).json({ task });
        
    } catch (error) {
        res.status(500).json({ msg:error });
    }

};

const deleteTask = async (req, res) => {
    try {
        const {id:TaskID} = req.params;
        const task = await Task.findOneAndDelete({_id: TaskID});

        if (!task) {
            return res.status(404).json({msg: `no task with id : ${TaskID}`})
        }

        res.status(200).json({ task });

    } catch (error) {
        res.status(500).json({ msg:error });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};