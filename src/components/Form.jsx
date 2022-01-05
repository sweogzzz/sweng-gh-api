import React from 'react';

function Form (props) {
    return (
        <div>
            <h1>GitHub API</h1>
            <br></br>
            <form onSubmit={(event) => props.submitHandler(event)}>
                <p id="frame">
                    Required input
                </p>
                <br></br>
                <label>
                    <label>Repo : </label>
                    <input
                        name="query"
                        type="text"
                        placeholder="user/repo"
                        defaultValue={'teamnewpipe/newpipe'}
                        required
                    />
                </label>
                <br></br>
                <br></br>
                <p id="frame">
                    User stats for a repo
                </p>
                <br></br>
                <label>
                    <label>User : </label>
                    <input
                        name="queryu"
                        type="text"
                        placeholder="user"
                        defaultValue={'tobigr'}
                    />
                </label>
                <br></br>
                <br></br>
                <p id="frame">
                    Larger date range = longer wait time
                </p>
                <br></br>
                <label>
                    <label>Since : </label>
                    <input
                        name="date1"
                        type="datetime-local"
                        defaultValue="2021-01-01T00:00:00.00"
                    />
                </label>
                <br></br>
                <label>
                    <label>Until : </label>
                    <input
                        name="date2"
                        type="datetime-local"
                        defaultValue="2022-01-01T00:00:00.00"
                    />
                </label>
                <br></br>
                <br></br>
                <div>
                    <input
                        type="submit"
                        value="Fetch"
                    />
                </div>
            </form>
        </div>
    )
}
export default Form;