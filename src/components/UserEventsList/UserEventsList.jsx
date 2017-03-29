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
                data: <p>This github event is of type "{event.type}". 
                        Right now this event is not recognized by our
                        timeline. It can be supported in future</p>,
            };
            switch (event.type) {
                case "PushEvent": {
                    eventData.title = (<p><b>Pushed {event.payload.size} commit(s) to
                                            <a href={github_base_url + event.repo.name}> {event.repo.name}</a></b>
                                      </p>);
                    eventData.icon = <Icon name="link" />;
                    eventData.data = event.payload.commits.map(function (commit) {
                        return <p key={commit.sha}><strong>{commit.sha.slice(0,5)}</strong> - { commit.message }</p>
                    });
                    break;
                }
                case "IssueCommentEvent": {
                    eventData.title = (
                        <p><b>
                            Commented on an <a href={event.payload.issue.html_url}>Issue</a> on 
                            <a href={github_base_url + event.repo.name}> {event.repo.name}</a>
                        </b></p>
                    );
                    eventData.data = (
                        <blockquote>
                            <p className="user-event-list-timeline-comments">{event.payload.comment.body}</p>
                        </blockquote>
                    )
                    break;
                }
                case "CreateEvent": {
                    if (event.payload.ref_type == "repository") {
                        eventData.title = (<p><b>Created a repository: 
                                            <a href={ github_base_url + event.repo.name } > {event.repo.name}</a>
                                          </b></p>)
                    } else if (event.payload.ref_type == "branch") {
                        eventData.title = (<p><b>Made a branch 
                                            <a href={ github_base_url + event.repo.name + '/tree/' + event.payload.ref }> { event.payload.ref } </a>
                                            from
                                            <a href={ github_base_url + event.repo.name } > {event.repo.name}</a>
                                          </b></p>);
                    }
                    eventData.data = <p><b>Repo description:</b> { event.payload.description }</p>
                    break;
                }
            }
            return (
                <TimelineEvent key={eventData.id}
                    title={eventData.title}
                    createdAt={eventData.dateTime}
                    icon={eventData.icon}>
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
        console.log("Event List: ", this.props);
        return (
            <div>
                <h5 className="user-event-list-heading"><b>Activity Timeline</b></h5> 
                <Timeline>
                    {userEvents.fetching ? <h5>Loading...</h5> : this.generateTimeline(userEvents.data)}
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

