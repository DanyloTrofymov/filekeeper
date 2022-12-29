import React from 'react';
import { useDispatch } from 'react-redux';
import './sort.css';
import { setSort } from '../../../../reducers/file';
const SortBox = () => {
    const dispatch = useDispatch();
    return (
        <div className="select-sort">
            <div className="text">Sort files by:</div>
            <fieldset className="fieldset">
                <div>
                    <label className="abel">
                        Date
                        <input
                            type="radio"
                            onChange={() => dispatch(setSort('date'))}
                            name="sort"
                            defaultChecked
                        />
                        <span className="radiomark"></span>
                    </label>
                    <label className="label">
                        Type
                        <input
                            type="radio"
                            onChange={() => dispatch(setSort('type'))}
                            name="sort"
                        />
                        <span className="radiomark"></span>
                    </label>
                    <label className="label">
                        Name
                        <input
                            type="radio"
                            onChange={() => dispatch(setSort('name'))}
                            name="sort"
                        />
                        <span className="radiomark"></span>
                    </label>
                    <label className="label">
                        Size
                        <input
                            type="radio"
                            onChange={() => dispatch(setSort('size'))}
                            name="sort"
                        />
                        <span className="radiomark"></span>
                    </label>
                </div>
            </fieldset>
        </div>
    );
};

export default SortBox;
