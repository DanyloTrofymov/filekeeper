import React from 'react';
import { useDispatch } from 'react-redux';
import './filter.css';
import { setFilter } from '../../../../reducers/file';

const FilterBox = () => {
    const dispatch = useDispatch();
    return (
        <div className="filter">
            <div className="text">Filters for files:</div>
            <fieldset className="fieldset">
                <div>
                    <label className="label">
                        Documents
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                dispatch(
                                    setFilter(e.target.name, e.target.checked),
                                )
                            }
                            name="doc"
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="label">
                        Music
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                dispatch(
                                    setFilter(e.target.name, e.target.checked),
                                )
                            }
                            name="music"
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="label">
                        Photo
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                dispatch(
                                    setFilter(e.target.name, e.target.checked),
                                )
                            }
                            name="pic"
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="label">
                        Video
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                dispatch(
                                    setFilter(e.target.name, e.target.checked),
                                )
                            }
                            name="vid"
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
            </fieldset>
        </div>
    );
};

export default FilterBox;
