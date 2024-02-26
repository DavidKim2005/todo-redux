import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchTasks } from "./listThunks";

const List: React.FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])
    return (
        <section>
            <div className="input-group mb-3">
                <span className="input-group-text" id="inputGroup-sizing-default">Enter your task</span>
                <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                <button type="button" className="btn btn-outline-success">Success</button>
            </div>
            <ListGroup>
                {tasks.map((task, id) => (
                    <div className="border rounded mb-3">
                        <ListGroup.Item key={id} className="border-0">{task.task}</ListGroup.Item>
                        <input className="form-check-input" type="checkbox" value="" id={`flexCheckDefault-${id}`}
                            checked={task.status} />
                    </div>
                ))}
            </ListGroup>
        </section>
    );
}

export default List