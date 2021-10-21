import './index.css';

const EmptySearch = () => {
    return(
        <div className = "container-title-component">
            <div className= "container-title-holder empty">

                <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={"exclamation"}
                >
                    <path
                        d="M9.9999 19.9998C4.48594 19.9998 0 15.5139 0 9.9999C0 4.48594 4.48594 0 9.9999 0C15.5139 0 19.9998 4.48594 19.9998 9.9999C19.9998 15.5139 15.5139 19.9998 9.9999 19.9998ZM9 12.9996V15.0003H10.9998V12.9996H9ZM9 5.0004V10.9998H10.9998V5.0004H9Z"
                        fill="#E0E0E0"
                        />
                </svg>
                <div className="empty-message">
                    Search does not match any valid statecoin or bitcoin address, transaction id or batch transfer id.
                </div>
            </div>
        </div>
    )
}

export default EmptySearch;