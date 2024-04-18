import PropTypes from 'prop-types'

const Notification = ({ content }) => (
    <div>a new anecdote {content } created!</div>
)

Notification.propTypes = {
    content: PropTypes.string.isRequired
}

export default Notification