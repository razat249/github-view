import React, { Component } from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline'
import Timestamp from 'react-timestamp';
import { Icon } from 'react-fa';
import { Button, Label } from 'react-bootstrap';

import { loadMoreEvents, fetchUserEvents } from '../../redux/actions/singleUserActions';
import { unSelectRepo } from '../../redux/actions/reposActions';
import LoadMoreActivities from '../LoadMoreActivities/LoadMoreActivities';
import './UserEventsList.css';

class UserEventsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filters: []
        }
    }

    filterTimeline(item) {
        const filters = this.state.filters;

        if (filters.length > 0) {
            if (filters.indexOf(item.type) >= 0) {
                return true;
            }

            return false;
        }

        return true;
    }

    addFilter(type) {
        const filters = this.state.filters;

        if (filters.indexOf(type) === -1) {
            filters.push(type);
            this.setState({ filters });
        }
    }

    removeFilter(type) {
        const filters = this.state.filters;

        filters.splice(filters.indexOf(type), 1);

        this.setState({ filters });
    }

    handleFilterChange(type, event) {
        if (event.target.checked) {
            this.addFilter(type)
            return true
        }

        this.removeFilter(type)
        return false
    }

    generateTimeline(eventList) {
        var timelineList = eventList.filter(item => this.filterTimeline(item)).map(function (event) {
            const github_base_url = 'https://github.com/';
            let eventData = {
                title: <p><b>Some github event. Type: {event.type}</b></p>,
                dateTime: <Timestamp time={event.created_at} format='full' />,
                icon: "",
                iconColor: "",
                data: <p>This github event is of type "{event.type}".
                        Right now this event is not recognized by our
                        timeline. It can be supported in future</p>,
            };
            switch (event.type) {
                case "PushEvent": {
                    eventData.title = (<p><b>Pushed {event.payload.commits.length} commit(s) to
                                            <a href={github_base_url + event.repo.name} target="_"> {event.repo.name}</a></b>
                                      </p>);
                    eventData.data = event.payload.commits.map(function (commit) {
                        return <p key={commit.sha}><strong>{commit.sha.slice(0,5)}</strong> - { commit.message } 
                                    <b> -- commited by <span className="text-info">{commit.author.name}</span></b>
                               </p>
                    });
                    eventData.iconColor = "lightgreen";
                    break;
                }
                case "IssueCommentEvent": {
                    eventData.title = (
                        <p><b>
                            Commented on an <a href={event.payload.issue.html_url} target="_">Issue</a> on
                            <a href={github_base_url + event.repo.name} target="_"> {event.repo.name}</a>
                        </b></p>
                    );
                    eventData.data = (
                        <blockquote>
                            <p className="user-event-list-timeline-comments">{event.payload.comment.body}</p>
                        </blockquote>
                    )
                    eventData.iconColor = "lightblue";
                    break;
                }
                case "CreateEvent": {
                    if (event.payload.ref_type === "repository") {
                        eventData.title = (<p><b>Created a repository:
                                            <a href={ github_base_url + event.repo.name } target="_"> {event.repo.name}</a>
                                          </b></p>)
                    } else if (event.payload.ref_type === "branch") {
                        eventData.title = (<p><b>Made a branch
                                            <a href={ github_base_url + event.repo.name + '/tree/' + event.payload.ref } target="_"> { event.payload.ref } </a>
                                            from
                                            <a href={ github_base_url + event.repo.name } target="_"> {event.repo.name}</a>
                                          </b></p>);
                    }
                    if (event.payload.description === null) {
                      eventData.data = <p><b>Repo description:</b> No description provided.</p>
                    } else {
                      eventData.data = <p><b>Repo description:</b> { event.payload.description }</p>
                    }
                    eventData.iconColor = "orange";
                    break;
                }
                case "IssuesEvent": {
                    eventData.title = (
                        <p><b>
                            { event.payload.action } -- <a href={event.payload.issue.html_url} target="_">issue</a> on
                            <a href={ github_base_url + event.repo.name } target="_"> {event.repo.name}</a>
                        </b></p>
                    );
                    eventData.data = (
                        <div>
                            <p><b>Issue title</b> - {event.payload.issue.title}</p>
                            <a href={event.payload.issue.html_url} target="_">See it on github <Icon name="external-link" /></a>
                        </div>
                    );
                    eventData.iconColor = "pink";
                    break;
                }
                case "ForkEvent": {
                    eventData.title = (
                        <p><b>
                            Forked <a href={github_base_url + event.payload.forkee.full_name} target="_">{event.payload.forkee.full_name}</a>
                            <span> from
                                <a href={github_base_url + event.repo.name} target="_" > { event.repo.name }</a>
                            </span>
                        </b></p>
                    );
                    eventData.data = <p><b>Repo description:</b> { event.payload.forkee.description }</p>;
                    eventData.iconColor = "yellow";
                    break;
                }
                case "PullRequestEvent": {
                    eventData.title = (
                        <p><b>
                            { event.payload.action } -- <a href={event.payload.pull_request.html_url} target="_">pull request</a> for
                            <a href={ github_base_url + event.repo.name } target="_"> {event.repo.name}</a>
                        </b></p>
                    );
                    eventData.data = (
                        <div>
                            <p><b>{ event.payload.pull_request.title }</b></p>
                            <p>{ event.payload.pull_request.body }</p>
                        </div>
                    );
                    eventData.iconColor = "#706bff";
                    break;
                }
            }
            return (
                <TimelineEvent key={event.id}
                    title={eventData.title}
                    createdAt={eventData.dateTime}
                    icon={eventData.icon}
                    iconColor={eventData.iconColor}>
                        {eventData.data}
                </TimelineEvent>
            )
        })
        return timelineList;
    }

    removeRepo() {
        this.props.dispatch(unSelectRepo());
        this.props.dispatch(fetchUserEvents(this.props.username));
    }

    render() {
        let userEvents = {
            data: [],
        };
        if (this.props.user.userEvents.fetched) {
            userEvents = this.props.user.userEvents;
        }
        return (
            <div>
                <div className="row lightslategray-color user-event-list-head">
                    <div className="pull-left">
                        <div className="text-center">
                            <h5><b>Activity Timeline</b></h5>
                            {this.props.selectedRepo.name ? 
                            <Label className="selected-repo-label" bsStyle="info">
                                {this.props.selectedRepo.name}
                                <Button onClick={e => this.removeRepo()} className="selected-repo-label-close"><Icon name="times-circle" /></Button>
                            </Label>:
                            ""}
                        </div>
                    </div>
                    <div className="text-center user-event-list-checkbox">
                        <form>
                            <div className="checkbox-inline">
                                <label><input onChange={(e) => this.handleFilterChange('PushEvent', e)} type="checkbox" value="1" />Push/commits</label>
                            </div>
                            <div className="checkbox-inline">
                                <label><input onChange={(e) => this.handleFilterChange('IssueCommentEvent', e)} type="checkbox" value="" />Comments</label>
                            </div>
                            <div className="checkbox-inline">
                                <label><input onChange={(e) => this.handleFilterChange('IssuesEvent', e)} type="checkbox" value="" />Issues</label>
                            </div>
                            <div className="checkbox-inline disabled">
                                <label><input onChange={(e) => this.handleFilterChange('PullRequestEvent', e)} type="checkbox" value="" />PR</label>
                            </div>
                            <div className="checkbox-inline disabled">
                                <label><input onChange={(e) => this.handleFilterChange('CreateEvent', e)} type="checkbox" value="" />Create</label>
                            </div>
                            <div className="checkbox-inline disabled">
                                <label><input onChange={(e) => this.handleFilterChange('ForkEvent', e)} type="checkbox" value="" />Forks</label>
                            </div>
                        </form>
                    </div>
                </div>
                <Timeline>
                    { userEvents.fetching ? <h5>Loading...</h5> : this.generateTimeline(userEvents.data) }
                </Timeline>
                <div className="well text-center">
                    {
                        userEvents.loadMore.fetching ? 
                        <h4 className="lightslategray-color text-center">
                            <Icon spin name="circle-o-notch" />
                            <b> Loading...</b>
                        </h4> :
                        <LoadMoreActivities />
                    }
                </div>
            </div>
        );
    }
}

export default UserEventsList;
