import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useEffect, useState } from "react";
import { fetchTasks, postTasks } from "./listThunks";

const List: React.FC = () => {
    const [taskInput, setTaskInput] = useState('');
    const listLoading = useSelector((state: RootState) => state.tasks.loading)
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskInput(e.target.value)
    };

    const handleSubmit = () => {
        if(taskInput !== '') {
            dispatch(postTasks({status: false, task: taskInput}))
            setTaskInput('')
        }
    }

    return (
        <section>
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Enter your task</span>
                <input onChange={handleInputChange} type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                <button onClick={handleSubmit} type="button" className="btn btn-outline-success">Success</button>
            </div>
            <ListGroup>
                {listLoading ? 'Loading...' : tasks.map((task, id) => (
                    <div className="border rounded mb-3" key={id}>
                    {task && <ListGroup.Item className="border-0">{task.task}</ListGroup.Item>}
                    {task && <input className="form-check-input" type="checkbox" value="" id={`flexCheckDefault-${id}`} checked={task.status} />}
                    <button type="button" className="btn btn-danger d-block ">Delete</button>
                </div>
                ))}
            </ListGroup>
        </section>
    );
}

export default List