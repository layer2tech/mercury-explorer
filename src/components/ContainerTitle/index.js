import './index.css';

const ContainerTitle = (props) => {
    return(
    <div className = "container-title-component">
        <div className = "container-title-container">
            <h1 className = "title">{props.title}</h1>
            <h1 className = "info">{props.info}</h1>
        </div>
    </div>
    )
}

export default ContainerTitle;