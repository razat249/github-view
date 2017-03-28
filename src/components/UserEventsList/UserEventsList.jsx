import React, { Component } from 'react';
import { Timeline, TimelineEvent } from 'react-event-timeline'
import { connect } from 'react-redux';
import Timestamp from 'react-timestamp';
import { Icon } from 'react-fa';

class UserEventsList extends Component {
    constructor(props) {
        super(props);
    }

    generateTimeline(eventList) {
        console.log(eventList)
        var timelineList = eventList.map(function (event) {
            const github_base_url = 'https://github.com/';
            let eventData = {
                title: "",
                dateTime: <Timestamp time={event.created_at} format='full' />,
                icon: "",
                data: ""
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
                            <p>{event.payload.comment.body}</p>
                        </blockquote>
                    )
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
                <h4>Timeline</h4>
                <Timeline>
                    {this.generateTimeline(userEvents.data)}
                    <TimelineEvent title="John Doe sent a SMS"
                        createdAt="2016-09-12 10:06 PM"
                        icon={<i className="material-icons md-18">textsms</i>}
                    >
                        I received the payment for $543. Should be shipping the item within a couple of hours.
                    </TimelineEvent>
                    <TimelineEvent
                        title="You sent an email to John Doe"
                        createdAt="2016-09-11 09:06 AM"
                        icon={<i className="material-icons md-18">email</i>}
                    >
                        Like we talked, you said that you would share the shipment details? This is an urgent order and so I
                        am losing patience. Can you expedite the process and pls do share the details asap. Consider this a
                        gentle reminder if you are on track already!
                    </TimelineEvent>
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

