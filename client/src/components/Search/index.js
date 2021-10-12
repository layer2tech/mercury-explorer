import { useState } from 'react';
import searchImg from '../../images/search.svg';
import './index.css';


const Search = (props) => {
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

        // if (value && (/[0-9A-Fa-f]{64}/g.test(value) || /^\d+$/.test(value))) {
        //     apiService.axiosClient.get('/ctrl/type?value=' + value)
        //         .then(response => {
        //             if (response.data.response === 'commitment') {
        //                 history.push(`/commitment/${value}`);
        //             } else if (response.data.response === 'merkle_root') {
        //                 history.push(`/merkle_root/${value}`);
        //             } else if (response.data.response === 'position') {
        //                 history.push(`/position/${value}`);
        //             } else if (response.data.response === 'txid') {
        //                 history.push(`/tx/${value}`);
        //             } else if (response.data.response === 'blockhash') {
        //                 history.push(`/block/${value}`);
        //             } else if (response.data.response === 'type unknown') {
        //                 this.setState({wrong_search_value: true});
        //             } else {
        //                 this.setState({wrong_search_value: true});
        //             }
        //         })
        //         .catch(() => {
        //             this.setState({wrong_search_value: true});
        //         });
        // } else {
        //     this.setState({wrong_search_value: true});
        // }
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
                    {
                        wrongSearchValue &&
                        <div className="search-tooltip ">
                            Search does not match any valid client position, attestation transaction id or
                            commitment hash.
                        </div>
                    }
                </div>
            </form>
        </div>
    )
}

export default Search;