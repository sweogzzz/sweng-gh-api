import React from 'react';

function Info (props) {
    return (
        <div>
            <h4>Owner: {props.data.repo?props.data.name:'n/a'}</h4>
            <img width="100" src={props.data.repo?props.data.repo.owner.avatar_url:null} alt="avatar.png"/>
            <h4>User: {props.data.activity?props.data.activity.author.login:'n/a'}</h4>
            <p id="frame">Might take a second to load</p>
            <br></br>
            <img width="100" src={props.data.activity?props.data.activity.author.avatar_url:null} alt="avatar.png"/>
            <br></br>
        </div>
    )
}
export default Info;