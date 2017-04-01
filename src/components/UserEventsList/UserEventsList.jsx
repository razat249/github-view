import React, { Component } from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline'
import { connect } from 'react-redux';
import Timestamp from 'react-timestamp';
import { Icon } from 'react-fa';

import './UserEventsList.css';

class UserEventsList extends Component {
    constructor(props) {
        super(props);
    }

    generateTimeline(eventList) {
        var timelineList = eventList.map(function (event) {
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
                                            <a href={github_base_url + event.repo.name}> {event.repo.name}</a></b>
                                      </p>);
                    eventData.data = event.payload.commits.map(function (commit) {
                        return <p key={commit.sha}><strong>{commit.sha.slice(0,5)}</strong> - { commit.message } <b>-- commited by </b>
                                    <a href={github_base_url + commit.author.name} target="_">
                                        {commit.author.name}
                                    </a>
                               </p>
                    });
                    break;
                }
                case "IssueCommentEvent": {
                    eventData.title = (
                        <p><b>
                            Commented on an <a href={event.payload.issue.html_url}>Issue</a> on 
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
                                            <a href={ github_base_url + event.repo.name } > {event.repo.name}</a>
                                          </b></p>)
                    } else if (event.payload.ref_type === "branch") {
                        eventData.title = (<p><b>Made a branch 
                                            <a href={ github_base_url + event.repo.name + '/tree/' + event.payload.ref }> { event.payload.ref } </a>
                                            from
                                            <a href={ github_base_url + event.repo.name } target="_"> {event.repo.name}</a>
                                          </b></p>);
                    }
                    eventData.data = <p><b>Repo description:</b> { event.payload.description }</p>
                    eventData.iconColor = "orange";
                    break;
                }
                case "IssuesEvent": {
                    eventData.title = (
                        <p><b>
                            { event.payload.action } -- <a href={event.payload.issue.html_url}>issue</a> on 
                            <a href={ github_base_url + event.repo.name } > {event.repo.name}</a>
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
                            { event.payload.action } -- <a href={event.payload.pull_request.html_url}>pull request</a> for 
                            <a href={ github_base_url + event.repo.name } > {event.repo.name}</a>
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
                <TimelineEvent key={eventData.id}
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
                        <h5><b>Activity Timeline</b></h5>
                    </div>
                    <div className="pull-right user-event-list-checkbox">
                        <form>
                            <div className="checkbox-inline">
                                <label><input type="checkbox" value="1" />push/commits</label>
                            </div>
                            <div className="checkbox-inline">
                                <label><input type="checkbox" value="" />comments</label>
                            </div>
                            <div className="checkbox-inline disabled">
                                <label><input type="checkbox" value="" />create</label>
                            </div>
                            <div className="checkbox-inline disabled">
                                <label><input type="checkbox" value="" />forks</label>
                            </div>
                            <div className="checkbox-inline disabled">
                                <label><input type="checkbox" value="" />gist</label>
                            </div>
                        </form>
                    </div>
                </div>
                <Timeline>
                    { userEvents.fetching ? <h5>Loading...</h5> : this.generateTimeline(userEvents.data) }
                </Timeline>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        user: state.singleUser,
    };
}

export default connect(mapStateToProps)(UserEventsList);

