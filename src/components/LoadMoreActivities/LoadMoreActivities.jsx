import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { loadMoreEvents } from '../../redux/actions/singleUserActions';
// import './LoadMoreActivities.css';

class LoadMoreActivities extends Component {
    constructor(props) {
        super(props);
    }

    loadMore() {
        const username = this.props.data.singleUser.userSummary.data.login
        const repoName = this.props.data.repos.selectedRepo.name;
        const pageNumberToLoad = this.props.data.singleUser.userEvents.loadMore.pageNumberToLoad + 1
        this.props.dispatch(loadMoreEvents(username, repoName, pageNumberToLoad));
    }

    render() {
        return (
            <Button bsStyle="primary" onClick={e => this.loadMore()}>Load More</Button>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state,
    };
}

export default connect(mapStateToProps)(LoadMoreActivities);
