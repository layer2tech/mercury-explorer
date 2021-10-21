import { useState } from 'react';
import { useHistory } from 'react-router-dom'
import searchImg from '../../images/search.svg';
import './index.css';


const Search = (props) => {
    const history = useHistory()
    const [wrongSearchValue, setWrongSearchValue] = useState(false)
    const [value,setValue] = useState("")

    function handleChange(event) {
        setValue(event.target.value);
        if (!event.target.value) {
            setWrongSearchValue(false)
        }

    }

    function handleSubmit(event) {
        event.preventDefault();
        setWrongSearchValue(false);

        if(["sc","bc","tb"].includes(value.substring(0,2))){
            history.push(`/address/${value}`)
        }
        
        else if([":1",":0"].includes(value.substring(value.length-2,value.length))){
            history.push(`/tx/${value}`)
        }

        else {
            history.push(`/swap/${value}`)
        }

    }



    return(
        <div className = "search" >
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        tabIndex="0"
                        type="text"
                        name="query"
                        id="search"
                        className={'form-control top-search mousetrap ' + (wrongSearchValue && 'wrong-search')}
                        placeholder={props.placeholder}
                        value={value} onChange={handleChange}
                    />
                    <img src={searchImg} alt="search" className="top-search-icon" />
                </div>
            </form>
        </div>
    )
}

export default Search;