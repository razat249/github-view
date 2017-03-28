import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserSummary extends Component {
  render() {
    console.log("Pupu", this.props);
    const user = this.props.singleUser.userSummary
    return (
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
        <p>{user.data.location}</p>
        <p>{user.data.email}</p>
        <p>{user.data.blog}</p>
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
