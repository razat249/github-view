import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'react-fa';

class UserSummary extends Component {
  render() {
    console.log("Pupu", this.props);
    const user = this.props.singleUser.userSummary
    return (
      <div>
        { 
          user.fetching ? <h4 className="text-center lightslategray-color"><b><Icon spin name="circle-o-notch" /> Loading...</b></h4> :
            user.fetched ?
            <div>
              <div><img src={user.data.avatar_url} className="img-responsive" alt=""/></div>
              <h4>{user.data.name}</h4>
              <h5>
                ({user.data.login})
                <small className="pull-right"><a href={user.data.html_url} target="_">Github</a></small>
              </h5>
              <p>
                {user.data.bio}
              </p>
              <hr/>
              <p><Icon name="map-marker" /> {user.data.location}</p>
              <p><Icon name="envelope" /> <a href={"mailto:" + user.data.email}>{user.data.email}</a></p>
              <p><Icon name="share" /> <a href={"http://" + user.data.blog} target="_">{user.data.blog}</a></p>
            </div>
            : <h5 className="text-center lightslategray-color"><b>User summary will load here</b></h5>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    singleUser: state.singleUser,
  };
}

export default connect(mapStateToProps)(UserSummary);
