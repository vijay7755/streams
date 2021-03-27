import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from './../Modal';
import history from './../../history';
import { fetchStream, deleteStream } from './../../actions';

class StreamDelete extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    renderContent() {
        if (!this.props.stream) {
            return "Are you sure you want to delete the the stream?"
        }
        return `Are you sure you want to delete the the stream with title: ${this.props.stream.title} ?`
    }

    renderActions() {
        const {id} = this.props.match.params;
        return (
            <React.Fragment>
                <button className="ui button negative" onClick={() => this.props.deleteStream(id)}>Delete</button>
                <Link className="ui button" to="/">Cancel</Link>
            </React.Fragment>
        )
    }

    render() {
        return (
            <Modal
                onDismiss={() => history.push('/')}
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
            />
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);