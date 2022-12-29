import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../../../reducers/file';
import { searchFiles } from '../../../../actions/file/searchFile';
import { getFiles } from '../../../../actions/file/getFiles';
import './searchBar.css';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [searchTimeout, setSearchTimeout] = useState(false);
    const currentDir = useSelector((state) => state.file.currentDir);
    let searchName;
    function searchHadler(e) {
        if (searchTimeout != false) {
            clearTimeout(searchTimeout);
        }
        if (e.target.value != '') {
            setSearchTimeout(
                setTimeout(
                    (value) => {
                        dispatch(setSearch(value));
                        dispatch(searchFiles(value));
                    },
                    300,
                    e.target.value,
                ),
            );
        } else {
            dispatch(setSearch(e.target.value));
            dispatch(getFiles(currentDir));
        }
    }

    return (
        <div className="search">
            <input
                value={searchName}
                onChange={(e) => searchHadler(e)}
                type="text"
                className="search__term"
                placeholder="File name"
            />
            <span type="submit" className="search__button">
                <span className="search__icon"></span>
            </span>
        </div>
    );
};

export default SearchBar;
