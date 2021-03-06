import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchStream, editStream } from'./../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (fromValues) => {
        this.props.editStream(this.props.match.params.id, fromValues)
    }

    render() {
        if(!this.props.stream) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h3>Edit a stream</h3>
                <StreamForm 
                    initialValues={_.pick(this.props.stream, 'title','description')} 
                    //initalValues is spl(pre-defined) property name of redux-form. to get the intialvalues for the form.
                    // initalValues={{title: 'sometitle', description: 'bla bla bla'}}
                    onSubmit={this.onSubmit}/>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id],
    }
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);